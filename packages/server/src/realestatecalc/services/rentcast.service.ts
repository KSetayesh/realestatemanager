import { Pool } from 'pg';
import fs from 'fs/promises';  // Use promise-based fs
import path from 'path';
import apiKeysConfig from '../../config/apiKeysConfig';
import { Injectable } from "@nestjs/common";
import {
    Country,
    ListingCreationType,
    ListingDetailsDTO,
    PropertyStatus,
    PropertyType,
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
    rentCastApiCallId: number;
    jsonData: any;
};

type RentCastSaleResponseType = {
    id: string;
    formattedAddress: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: State;
    zipCode: string;
    county: Country;
    bedrooms: number;
    bathrooms: number;
    latitude: number;
    longitude: number;
    squareFootage: number;
    propertyType: PropertyType;
    lotSize: number;
    status: PropertyStatus;
    yearBuilt: number;
    price: number;
    listedDate: string;
    removedDate: string;
    createdDate: string;
    lastSeenDate: string;
    daysOnMarket: number;
};

type RentCastPropertyResponseType = {
    id: string;
    formattedAddress: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: State;
    zipCode: string;
    county: Country;
    bedrooms: number;
    bathrooms: number;
    latitude: number;
    longitude: number;
    squareFootage: number;
    propertyType: PropertyType;
    lotSize: number;
    yearBuilt: number;
    assessorID: string;
    lastSalePrice: number;
    lastSaleDate: Date;
    ownerOccupied: boolean;
    features: {
        garage: boolean;
        pool: boolean;
        floorCount: number;
        unitCount: number;
    };
    previousYearPropertyTaxes: number;
    owner: {
        names: string[];
        mailingAddress: {
            id: string;
            formattedAddress: string;
            addressLine1: string;
            addressLine2: string;
            city: string;
            state: State;
            zipCode: string;
        };
    };
};

@Injectable()
export class RentCastService {

    private rentCastManager: RentCastManager;
    private pool: Pool;
    private latestRentCastSaleFilePath = path.join(__dirname, '../../../src/data/latestRentCastSale.json');
    private latestRentCastPropertyFilePath = path.join(__dirname, '../../../src/data/latestRentCastProperty.json');
    private SALE_END_POINT = 'https://api.rentcast.io/v1/listings/sale';
    private PROPERTY_RECORDS_END_POINT = 'https://api.rentcast.io/v1/properties';

    constructor() {
        this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
        this.pool = DatabaseManagerFactory.getDbPool();
    }

    async getRentCastApiDetails(): Promise<RentCastDetailsDTO> {
        return (await this.rentCastManager.getRentCastDetails(this.pool)).toDTO();
    }

    async addNewPropertyWithRentCastAPI(rentCastApiRequest: RentCastApiRequestDTO): Promise<number> {

        const client = await this.pool.connect();
        let numberOfPropertiesAdded = 0;

        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            numberOfPropertiesAdded = await this._addNewPropertyWithRentCastAPI(rentCastApiRequest);

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

    async _addNewPropertyWithRentCastAPI(rentCastApiRequest: RentCastApiRequestDTO): Promise<number> {

        const canCallRentCastApi: boolean = await this.canCallRentCastApi();

        if (!canCallRentCastApi) {
            return 0;
        }

        const saleApiResponse: RentCastApiResponse = await this.callRentCastApi(
            this.SALE_END_POINT,
            rentCastApiRequest,
            this.latestRentCastSaleFilePath
        );

        const rentCastSalesResponses: RentCastResponse[] = this.parseApiResponse(saleApiResponse.jsonData);

        console.log("rentCastSalesResponses:", rentCastSalesResponses);

        const rentCastPropertyResponses: RentCastResponse[] = [];

        let propertyApiResponse: RentCastApiResponse;
        if (rentCastApiRequest.retrieveExtraData) {
            const canCallRentCastApi = await this.canCallRentCastApi();
            if (canCallRentCastApi) {
                propertyApiResponse = await this.callRentCastApi(
                    this.PROPERTY_RECORDS_END_POINT,
                    rentCastApiRequest,
                    this.latestRentCastPropertyFilePath
                );
                rentCastPropertyResponses.push(...this.parseApiResponse(propertyApiResponse.jsonData)); //(saleApiResponse.jsonData));
            }
        }

        console.log("rentCastPropertyResponses:", rentCastPropertyResponses);

        return this.persistNewListingAndRentCastDetails(
            rentCastSalesResponses,
            rentCastPropertyResponses,
            saleApiResponse.rentCastApiCallId,
            propertyApiResponse?.rentCastApiCallId ?? -1,
        );

    }

    private async callRentCastApi(endpoint: string, rentCastApiRequest: RentCastApiRequestDTO, filePath: string): Promise<RentCastApiResponse> {

        console.log("requestData:", rentCastApiRequest);

        const url = this.createURL(endpoint, rentCastApiRequest);

        console.log("URL for RentCast Api:", url);

        try {
            const options = this.getHeadersForRentCastApiCall();
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
                await this.writeResponseToJsonFile(filePath, data);
                return {
                    rentCastApiCallId: rentCastApiCallId,
                    jsonData: data,
                };

            } else {
                console.log("Is NOT successful!");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error(error);// Re-throw the error if needed or handle it as needed
        }
    }


    private async persistNewListingAndRentCastDetails(
        rentCastSaleResponses: RentCastResponse[],
        rentCastPropertyResponses: RentCastResponse[],
        rentCastSaleApiCallId: number,
        rentCastPropertyApiCallId: number,
    ): Promise<number> {

        const createRentCastSaleResponseType = (rentCastSalesResponse: RentCastResponse): RentCastSaleResponseType => {
            const jsonData = rentCastSalesResponse.apiResponseData;

            return {
                id: rentCastSalesResponse.id,
                formattedAddress: jsonData.formattedAddress ?? '',
                addressLine1: jsonData.addressLine1 ?? '',
                addressLine2: jsonData.addressLine2 ?? '',
                city: jsonData.city ?? '',
                state: jsonData.state ?? '',
                zipCode: jsonData.zipCode ?? '',
                county: jsonData.county ?? '',
                bedrooms: jsonData.bedrooms ?? -1,
                bathrooms: jsonData.bathrooms ?? -1,
                latitude: jsonData.latitude ?? -1,
                longitude: jsonData.longitude ?? -1,
                squareFootage: jsonData.squareFootage ?? -1,
                propertyType: jsonData.propertyType ?? '',
                lotSize: jsonData.lotSize ?? -1,
                status: jsonData.status ?? '',
                yearBuilt: jsonData.yearBuilt ?? -1,
                price: jsonData.price ?? -1,
                listedDate: jsonData.listedDate ?? new Date(0),
                removedDate: jsonData.removedDate ?? new Date(0),
                createdDate: jsonData.createdDate ?? new Date(0),
                lastSeenDate: jsonData.lastSeenDate ?? new Date(0),
                daysOnMarket: jsonData.daysOnMarket ?? 0,   // Come back to this and think about what to do here
            };
        };

        const createRentCastPropertyResponseType = (rentCastSalesResponse: RentCastResponse): RentCastPropertyResponseType => {

            const jsonData = rentCastSalesResponse.apiResponseData;

            const getLatestPropertyTax = (jsonData): number => {
                const currentYear = new Date().getFullYear();
                const lastYear = currentYear - 1;
                const yearBeforeLast = currentYear - 2;

                // Check for last year and the year before last
                if (jsonData.propertyTaxes) {
                    if (jsonData.propertyTaxes[lastYear]) {
                        return jsonData.propertyTaxes[lastYear].total;
                    } else if (jsonData.propertyTaxes[yearBeforeLast]) {
                        return jsonData.propertyTaxes[yearBeforeLast].total;
                    }
                }

                // Return -1 if no data available
                return -1;
            };

            return {
                id: rentCastSalesResponse.id,
                formattedAddress: jsonData.formattedAddress ?? '',
                addressLine1: jsonData.addressLine1 ?? '',
                addressLine2: jsonData.addressLine2 ?? '',
                city: jsonData.city ?? '',
                state: jsonData.state ?? '',
                zipCode: jsonData.zipCode ?? '',
                county: jsonData.county ?? '',
                bedrooms: jsonData.bedrooms ?? -1,
                bathrooms: jsonData.bathrooms ?? -1,
                latitude: jsonData.latitude ?? -1,
                longitude: jsonData.longitude ?? -1,
                squareFootage: jsonData.squareFootage ?? -1,
                propertyType: jsonData.propertyType ?? '',
                lotSize: jsonData.lotSize ?? -1,
                yearBuilt: jsonData.yearBuilt ?? -1,

                assessorID: jsonData.assessorID ?? '',
                lastSalePrice: jsonData.lastSalePrice ?? -1,
                lastSaleDate: jsonData.lastSaleDate ?? new Date(0),
                ownerOccupied: jsonData.ownerOccupied ?? false,
                features: {
                    garage: jsonData.features?.garage ?? false,
                    pool: jsonData.features?.pool ?? false,
                    floorCount: jsonData.features?.floorCount ?? -1,
                    unitCount: jsonData.features?.unitCount ?? -1
                },
                previousYearPropertyTaxes: getLatestPropertyTax(jsonData),
                owner: {
                    names: jsonData.owner?.names ?? [],
                    mailingAddress: {
                        id: jsonData.owner?.mailingAddress?.id ?? '',
                        formattedAddress: jsonData.owner?.mailingAddress?.formattedAddress ?? '',
                        addressLine1: jsonData.owner?.mailingAddress?.addressLine1 ?? '',
                        addressLine2: jsonData.owner?.mailingAddress?.addressLine2 ?? '',
                        city: jsonData.owner?.mailingAddress?.city ?? '',
                        state: jsonData.owner?.mailingAddress?.state ?? '',
                        zipCode: jsonData.owner?.mailingAddress?.zipCode ?? '',
                    },
                },
            };
        };


        const rentCastPropertyMap: Map<string, RentCastResponse> =
            new Map(rentCastPropertyResponses.map((rentCastProperty: RentCastResponse) =>
                [rentCastProperty.id, rentCastProperty]));


        try {
            const addressIdOfMatchesFound = new Set<string>();
            let numberOfPropertiesAdded = 0;
            for (const rentCastSaleResponse of rentCastSaleResponses) {
                const addressIdFound = await this.rentCastManager.checkIfAddressIdExists(this.pool, rentCastSaleResponse.id);
                console.log("addressIdFound:", addressIdFound);
                if (addressIdFound) {
                    console.log(`${addressIdFound} already exists in the database, skipping`);
                    continue;
                }
                const rentCastSaleResponseId = await this.rentCastManager.insertRentCastApiResponse(this.pool, rentCastSaleResponse, rentCastSaleApiCallId);
                let rentCastPropertyResponseId = -1;

                let listingDetail: ListingDetailsDTO;
                if (rentCastPropertyApiCallId > -1 && (rentCastSaleResponse.id in rentCastPropertyMap)) {
                    const rentCastProperty: RentCastResponse = rentCastPropertyMap[rentCastSaleResponse.id];
                    rentCastPropertyResponseId = await this.rentCastManager.insertRentCastApiResponse(this.pool, rentCastProperty, rentCastPropertyApiCallId);

                    listingDetail = this.buildListingDetails(
                        createRentCastSaleResponseType(rentCastSaleResponse),
                        createRentCastPropertyResponseType(rentCastProperty)
                    );
                    addressIdOfMatchesFound.add(rentCastSaleResponse.id);
                }
                else {
                    listingDetail = this.buildListingDetails(
                        createRentCastSaleResponseType(rentCastSaleResponse),
                    );
                }

                const newListingId = await new CalcService().insertListingDetails(
                    listingDetail,
                    ListingCreationType.RENT_CAST_API,
                    rentCastSaleResponseId,
                    rentCastPropertyResponseId,
                );

                if (newListingId > -1) {
                    numberOfPropertiesAdded++;
                }
            }

            console.log("rentCastPropertyApiCallId:", rentCastPropertyApiCallId);
            for (const addressId of rentCastPropertyMap.keys()) {
                if (!addressIdOfMatchesFound.has(addressId)) {
                    const rentCastProperty: RentCastResponse = rentCastPropertyMap.get(addressId);
                    await this.rentCastManager.insertRentCastApiResponse(this.pool, rentCastProperty, rentCastPropertyApiCallId);
                }
            }

            return numberOfPropertiesAdded;


        } catch (error) {
            throw error;
        }

    }

    private buildListingDetails(
        rentCastSalesResponseTyped: RentCastSaleResponseType,
        rentCastPropertyTyped?: RentCastPropertyResponseType,
    ): ListingDetailsDTO {
        const daysOnMarket = rentCastSalesResponseTyped.daysOnMarket ?? 0;
        const listedDate = rentCastSalesResponseTyped.listedDate ?? Utility.getDateNDaysAgo(daysOnMarket);
        const numberOfBathrooms = rentCastSalesResponseTyped.bathrooms ?? rentCastPropertyTyped?.bathrooms ?? -1;
        const numberOfFullBathrooms = Math.floor(numberOfBathrooms);
        const numberOfHalfBathrooms = Utility.isDecimal(numberOfBathrooms) ? 1 : 0;
        const lotSize = rentCastSalesResponseTyped.lotSize ?? rentCastPropertyTyped?.lotSize;
        const acres = lotSize ? convertSquareFeetToAcres(lotSize) : -1;
        let propertyTax = -1;
        if (rentCastPropertyTyped && rentCastPropertyTyped.previousYearPropertyTaxes > -1) {
            propertyTax = Utility.round(rentCastPropertyTyped.previousYearPropertyTaxes / 12);
        }

        const listingDetail: ListingDetailsDTO = {
            zillowURL: `NEED TO UPDATE_${rentCastSalesResponseTyped.id}`,
            propertyDetails: {
                address: {
                    fullAddress: rentCastSalesResponseTyped.formattedAddress ?? rentCastPropertyTyped?.formattedAddress ?? '',
                    state: rentCastSalesResponseTyped.state ?? rentCastPropertyTyped?.state, // Let it be undefined
                    zipcode: rentCastSalesResponseTyped.zipCode ?? rentCastPropertyTyped?.zipCode ?? '',
                    city: rentCastSalesResponseTyped.city ?? rentCastPropertyTyped?.city ?? '',
                    county: rentCastSalesResponseTyped.county ?? rentCastPropertyTyped?.county ?? '',
                    country: Country.UnitedStates,
                    streetAddress: rentCastSalesResponseTyped.addressLine1 ?? rentCastPropertyTyped?.addressLine1 ?? '',
                    apartmentNumber: rentCastSalesResponseTyped.addressLine2 ?? rentCastPropertyTyped?.addressLine2 ?? '',
                    longitude: rentCastSalesResponseTyped.longitude ?? rentCastPropertyTyped?.longitude ?? -1,
                    latitude: rentCastSalesResponseTyped.latitude ?? rentCastPropertyTyped?.latitude ?? -1,
                },
                schoolRating: {
                    elementarySchoolRating: -1,
                    middleSchoolRating: -1,
                    highSchoolRating: -1,
                },
                numberOfBedrooms: rentCastSalesResponseTyped.bedrooms ?? rentCastPropertyTyped?.bedrooms ?? -1,
                numberOfFullBathrooms: numberOfFullBathrooms,
                numberOfHalfBathrooms: numberOfHalfBathrooms,
                squareFeet: rentCastSalesResponseTyped.squareFootage ?? rentCastPropertyTyped?.squareFootage ?? -1,
                acres: acres,
                yearBuilt: rentCastSalesResponseTyped.yearBuilt ?? rentCastPropertyTyped?.yearBuilt ?? -1,
                hasGarage: rentCastPropertyTyped?.features?.garage ?? false,
                hasPool: rentCastPropertyTyped?.features?.pool ?? false,
                hasBasement: false, // No info here
                propertyType: rentCastSalesResponseTyped.propertyType ?? rentCastPropertyTyped?.propertyType, // Let it be undefined
                description: '',
            },
            zillowMarketEstimates: {
                zestimate: -1,
                zestimateRange: {
                    low: -1,
                    high: -1,
                },
                zillowRentEstimate: -1,
                zillowMonthlyPropertyTaxAmount: propertyTax,
                zillowMonthlyHomeInsuranceAmount: -1,
                zillowMonthlyHOAFeesAmount: -1,
            },
            listingPrice: rentCastSalesResponseTyped.price ?? -1,
            dateListed: listedDate,
            numberOfDaysOnMarket: daysOnMarket,
            propertyStatus: rentCastSalesResponseTyped.status, // Let it be undefined
        };

        console.log("listingDetails:", listingDetail);

        return listingDetail;
    }

    private async writeResponseToJsonFile(filePath: string, data: any): Promise<void> {
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
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