import { Pool } from 'pg';
import fs from 'fs/promises';  // Use promise-based fs
import path from 'path';
import apiKeysConfig from '../../config/apiKeysConfig';
import { Injectable } from "@nestjs/common";
import {
    Country,
    ListingCreationType,
    ListingDetailsDTO,
    RentCastApiRequestDTO,
    RentCastDetailsDTO,
    State,
    Utility
} from "@realestatemanager/shared";
import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";
import { RentCastManager } from "src/db/realestate/rentcast.db";
import { RentCastResponse } from "../models/rent_cast_api_models/rentcastresponse.model";
import { RentCastDetails } from "../models/rent_cast_api_models/rentcastdetails.model";
import { convertSquareFeetToAcres } from 'src/shared/Constants';
import { CalcService } from './calc.service';

type RentCastApiResponse = {
    // executionTime: Date;
    rentCastApiCallId: number;
    // url: string;
    jsonData: any;
};

@Injectable()
export class RentCastService {

    private rentCastManager: RentCastManager;
    private pool: Pool;
    private latestRentCastFilePath = path.join(__dirname, '../../../src/data/latestRentCast.json');
    private SALE_END_POINT = 'https://api.rentcast.io/v1/listings/sale';
    private PROPERTY_RECORDS_END_POINT = 'https://api.rentcast.io/v1/listings/properties';

    constructor() {
        this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
        this.pool = DatabaseManagerFactory.getDbPool();
    }

    async getRentCastApiDetails(): Promise<RentCastDetailsDTO> {
        return (await this.rentCastManager.getRentCastDetails(this.pool)).toDTO();
    }

    async addNewPropertyWithRentCastAPI(rentCastApiRequest: RentCastApiRequestDTO): Promise<number> {
        console.log("In addNewPropertyWithRentCastAPI!");
        console.log("requestData:", rentCastApiRequest);
        const client = await this.pool.connect();
        let numberOfPropertiesAdded = 0;

        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            const saleApiResponse: RentCastApiResponse = await this._addNewPropertyWithRentCastAPI(this.SALE_END_POINT, rentCastApiRequest);
            if (!saleApiResponse) {
                return;
            }
            const rentCastSalesResponses: RentCastResponse[] = this.parseApiResponse(saleApiResponse.jsonData);
            const rentCastPropertyResponses: RentCastResponse[] = [];

            if (rentCastApiRequest.retrieveExtraData) {
                const propertyApiResponse = await this._addNewPropertyWithRentCastAPI(this.PROPERTY_RECORDS_END_POINT, rentCastApiRequest);
                if (!propertyApiResponse) {
                    return;
                }
                rentCastPropertyResponses.push(...this.parseApiResponse(saleApiResponse.jsonData));
            }

            numberOfPropertiesAdded = await this.persistNewListingAndRentCastDetails(
                rentCastSalesResponses,
                saleApiResponse.rentCastApiCallId,
            );

            console.log(`${numberOfPropertiesAdded} new properties added!`);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
            return numberOfPropertiesAdded;
        }

    }

    private async _addNewPropertyWithRentCastAPI(endpoint: string, rentCastApiRequest: RentCastApiRequestDTO): Promise<RentCastApiResponse> {

        console.log("In addNewPropertyWithRentCastAPI!");
        console.log("requestData:", rentCastApiRequest);

        const canCallRentCastApi: boolean = await this.canCallRentCastApi();

        if (!canCallRentCastApi) {
            return;
        }

        const url = this.createURL(endpoint, rentCastApiRequest);

        console.log("URL for RentCast Api:", url);

        try {
            return this.callRentCastApi(endpoint, url);
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }

    }

    private async persistNewListingAndRentCastDetails(
        rentCastResponses: RentCastResponse[],
        rentCastApiCallId: number,
    ): Promise<number> {

        try {
            let numberOfPropertiesAdded = 0;
            for (const rentCastResponse of rentCastResponses) {
                const addressIdFound = await this.rentCastManager.checkIfAddressIdExists(this.pool, rentCastResponse.id);
                if (addressIdFound) {
                    console.log(`${addressIdFound} already exists in the database, skipping`);
                    continue;
                }
                const rentCastResponseId = await this.rentCastManager.insertRentCastApiResponse(this.pool, rentCastResponse, rentCastApiCallId);
                const listingDetail: ListingDetailsDTO = this.createListingDetails(rentCastResponse);

                await new CalcService().insertListingDetails(listingDetail, ListingCreationType.RENT_CAST_API, rentCastResponseId);

                numberOfPropertiesAdded++;
            }
            return numberOfPropertiesAdded;


        } catch (error) {
            throw error;
        }

    }

    private createListingDetails(rentCastResponse: RentCastResponse): ListingDetailsDTO {
        const daysOnMarket = rentCastResponse.apiResponseData.daysOnMarket ?? 0;
        const listedDate = rentCastResponse.apiResponseData.listedDate ?? Utility.getDateNDaysAgo(daysOnMarket);
        const numberOfBathrooms = rentCastResponse.apiResponseData.bathrooms ?? -1;
        const numberOfFullBathrooms = Math.floor(numberOfBathrooms);
        const numberOfHalfBathrooms = Utility.isDecimal(numberOfBathrooms) ? 1 : 0;
        const lotSize = rentCastResponse.apiResponseData.lotSize;
        const acres = lotSize ? convertSquareFeetToAcres(lotSize) : -1;

        const listingDetail: ListingDetailsDTO = {
            zillowURL: `NEED TO UPDATE_${rentCastResponse.id}`,
            propertyDetails: {
                address: {
                    fullAddress: rentCastResponse.apiResponseData.formattedAddress ?? '',
                    state: rentCastResponse.apiResponseData.state ?? '',
                    zipcode: rentCastResponse.apiResponseData.zipCode ?? '',
                    city: rentCastResponse.apiResponseData.city ?? '',
                    county: rentCastResponse.apiResponseData.county ?? '',
                    country: Country.UnitedStates,
                    streetAddress: rentCastResponse.apiResponseData.addressLine1 ?? '',
                    apartmentNumber: rentCastResponse.apiResponseData.addressLine2 ?? '',
                    longitude: rentCastResponse.apiResponseData.longitude ?? -1,
                    latitude: rentCastResponse.apiResponseData.latitude ?? -1,
                },
                schoolRating: {
                    elementarySchoolRating: -1,
                    middleSchoolRating: -1,
                    highSchoolRating: -1,
                },
                numberOfBedrooms: rentCastResponse.apiResponseData.bedrooms ?? -1,
                numberOfFullBathrooms: numberOfFullBathrooms,
                numberOfHalfBathrooms: numberOfHalfBathrooms,
                squareFeet: rentCastResponse.apiResponseData.squareFootage ?? -1,
                acres: acres,
                yearBuilt: rentCastResponse.apiResponseData.yearBuilt ?? -1,
                hasGarage: false,
                hasPool: false,
                hasBasement: false,
                propertyType: rentCastResponse.apiResponseData.propertyType ?? -1,
                description: '',
            },
            zillowMarketEstimates: {
                zestimate: -1,
                zestimateRange: {
                    low: -1,
                    high: -1,
                },
                zillowRentEstimate: -1,
                zillowMonthlyPropertyTaxAmount: -1,
                zillowMonthlyHomeInsuranceAmount: -1,
                zillowMonthlyHOAFeesAmount: -1,
            },
            listingPrice: rentCastResponse.apiResponseData.price ?? -1,
            dateListed: listedDate,
            numberOfDaysOnMarket: daysOnMarket,
            propertyStatus: rentCastResponse.apiResponseData.status ?? '',
        };

        return listingDetail;
    }

    private async callRentCastApi(endpoint: string, url: string): Promise<RentCastApiResponse> {

        const options = this.getHeadersForRentCastApiCall();

        try {
            const response = await fetch(url, options);
            if (response.status === 200) {
                const executionTime = new Date();
                console.log("Is successful!");

                // Call updateNumberOfApiCalls here
                await this.rentCastManager.updateNumberOfApiCalls(this.pool);
                const rentCastApiCallId = await this.rentCastManager.insertRentCastApiCall(
                    this.pool,
                    endpoint,
                    url,
                    executionTime
                );
                const data = await response.json();
                console.log("_data1:", data); // Log the response data

                // Write response data to JSON file
                await this.writeResponseToJsonFile(data);
                return {
                    rentCastApiCallId: rentCastApiCallId,
                    jsonData: data,
                };

            } else {
                console.log("Is NOT successful!");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (err) {
            console.error('Error:', err);
            throw err;  // Re-throw the error if needed or handle it as needed
        }
    }

    private async writeResponseToJsonFile(data: any): Promise<void> {
        try {
            await fs.writeFile(this.latestRentCastFilePath, JSON.stringify(data, null, 2), 'utf8');
            console.log('File has been saved successfully.');
        } catch (err) {
            console.error('Failed to write to file:', err);
        }
    }

    private getHeadersForRentCastApiCall() {
        return {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Api-Key': apiKeysConfig.rentCastApiKey,
            }
        };
    }

    private async canCallRentCastApi(): Promise<boolean> {
        if (!apiKeysConfig.canMakeRentCastApiCall) {
            console.log(`"canMakeRentCastApiCall" is set to false in .env`);
            return false;
        }

        const rentCastDetails: RentCastDetails = await this.rentCastManager.getRentCastDetails(this.pool);

        if (!rentCastDetails.canMakeFreeApiCall) {
            console.log(`Number of rent cast api calls has exceeded ${rentCastDetails.numberOfFreeApiCalls}`);
            return false;
        }
        return true;
    }

    private parseApiResponse(jsonData: any): RentCastResponse[] {

        console.log("_data2:", jsonData); // Log the response data

        const rentCastResponses: RentCastResponse[] = [];
        // Iterate through each object in the array
        for (const property of jsonData) {
            rentCastResponses.push(new RentCastResponse(property.id, property));
        }

        return rentCastResponses;

    };

    private createURL(endpoint: string, rentCastApiRequest: RentCastApiRequestDTO): string {
        let appendToUrl = '';
        let firstAppended = true;
        if (rentCastApiRequest.address) {
            appendToUrl += this.appendUrlParameter('address', rentCastApiRequest.address, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.city) {
            appendToUrl += this.appendUrlParameter('city', rentCastApiRequest.city, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.state) {
            const state = Utility.getEnumNameFromValue(State, rentCastApiRequest.state) ?? '';
            appendToUrl += this.appendUrlParameter('state', state, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.zipCode) {
            appendToUrl += this.appendUrlParameter('zipCode', rentCastApiRequest.zipCode, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.latitude) {
            appendToUrl += this.appendUrlParameter('latitude', rentCastApiRequest.latitude.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.longitude) {
            appendToUrl += this.appendUrlParameter('longitude', rentCastApiRequest.longitude.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.radius) {
            appendToUrl += this.appendUrlParameter('radius', rentCastApiRequest.radius.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.propertyType) {
            appendToUrl += this.appendUrlParameter('propertyType', rentCastApiRequest.propertyType, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.bedrooms) {
            appendToUrl += this.appendUrlParameter('bedrooms', rentCastApiRequest.bedrooms.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.bathrooms) {
            appendToUrl += this.appendUrlParameter('bathrooms', rentCastApiRequest.bathrooms.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.status) {
            appendToUrl += this.appendUrlParameter('status', rentCastApiRequest.status, firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.daysOld) {
            appendToUrl += this.appendUrlParameter('daysOld', rentCastApiRequest.daysOld.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.limit) {
            appendToUrl += this.appendUrlParameter('limit', rentCastApiRequest.limit.toString(), firstAppended);
            firstAppended = false;
        }
        if (rentCastApiRequest.offset) {
            appendToUrl += this.appendUrlParameter('offset', rentCastApiRequest.offset.toString(), firstAppended);
            firstAppended = false;
        }
        return `${endpoint}${appendToUrl}`;
    }

    private appendUrlParameter(
        property: string,
        value: string,
        firstAppended: boolean,
    ): string {
        const space = '%20';
        value = value.replace(/ /g, space);
        const returnValue = `${property}=${value}`;
        if (firstAppended) {
            return `?${returnValue}`;
        }
        else {
            return `&${returnValue}`;
        }
    }

}