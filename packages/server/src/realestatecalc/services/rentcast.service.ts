import { Pool } from 'pg';
import { Injectable } from "@nestjs/common";
import {
    Country,
    ListingCreationType,
    ListingDetailsDTO,
    PropertyStatus,
    PropertyType,
    CreateRentCastApiRequest,
    RentCastDetailsResponseDTO,
    State, 
} from "@realestatemanager/shared";
import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";
import { RentCastResponse } from "../models/rent_cast_api_models/rentcastresponse.model";
import { CalcService } from './calc.service';
import { RentCastApiClient, RentCastApiResponse, RentCastEndPoint } from '../api/rent.cast.api.client';
import { RentCastManager } from 'src/db/realestate/dbmanager/rentcast.manager';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { RentCastMatchingData } from '../models/rent_cast_api_models/rentcastmatchingdata.model';
import { ListingDetails } from '../models/listing_models/listingdetails.model';
import { ListingDetailsDTOBuilder } from '../builders/listing.details.dto.builder';

export type RentCastSaleResponseType = {
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
    listedDate: string;  // Figure out if this should be a string or a Date
    removedDate: string;  // Figure out if this should be a string or a Date
    createdDate: string;  // Figure out if this should be a string or a Date
    lastSeenDate: string;  // Figure out if this should be a string or a Date
    daysOnMarket: number;
};

export type RentCastPropertyResponseType = {
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
    lastSaleDate: Date; // Figure out if this should be a string or a Date
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
    private listingManager: ListingManager;
    private rentCastApiClient: RentCastApiClient;
    private pool: Pool;

    constructor() {
        this.rentCastManager = DatabaseManagerFactory.createRentCastManager();
        this.listingManager = DatabaseManagerFactory.createListingManager();
        this.pool = DatabaseManagerFactory.getDbPool();
        this.rentCastApiClient = new RentCastApiClient();
    }

    async getRentCastApiDetailsDTO(): Promise<RentCastDetailsResponseDTO[]> {
        return (await this.rentCastManager.getRentCastApiDetails(this.pool)).map(rentCastDetail => {
            return rentCastDetail.toDTO();
        });
    }

    async addNewPropertyWithRentCastAPI(rentCastApiRequest: CreateRentCastApiRequest): Promise<number> {
        let numberOfPropertiesAdded = await this._addNewPropertyWithRentCastAPI(rentCastApiRequest);

        // Come back and create a return type with additional data instead of just returning a number
        numberOfPropertiesAdded += await this.matchAndCreateListing();

        return numberOfPropertiesAdded;
    }

    private async matchAndCreateListing(): Promise<number> {
        const saleEndpoint = this.getEndpoint(RentCastEndPoint.SALE);
        const propertiesEndpoint = this.getEndpoint(RentCastEndPoint.PROPERTIES);

        const rentCastMatchingData: RentCastMatchingData[] =
            await this.rentCastManager.findMatchingRentingCastData(this.pool, saleEndpoint, propertiesEndpoint);

        const rentCastSaleResponseIds: number[] = rentCastMatchingData.map(rentCastMatch => {
            return rentCastMatch.rentCastSaleResponseId;
        });

        const listingsWithRentCastIds: Map<number, ListingDetails> = new Map();
        const listingDetails: ListingDetails[] = await this.listingManager.getListingsByRentCastSaleResponseIds(this.pool, rentCastSaleResponseIds);

        for (const listingDetail of listingDetails) {
            const rentCastSaleResponseId = listingDetail.rentCastSaleResponseId;
            if (rentCastSaleResponseId && rentCastSaleResponseId > -1) {
                listingsWithRentCastIds.set(rentCastSaleResponseId, listingDetail);
            }
        }

        const isValidData = (rentCastSalesResponses: RentCastResponse[], rentCastPropertyResponses: RentCastResponse[]): boolean => {
            return rentCastSalesResponses.length == 1 && rentCastPropertyResponses.length == 1
        };

        let numberOfPropertiesAdded = 0;
        for (const rentCastMatch of rentCastMatchingData) {
            const rentCastSalesResponses: RentCastResponse[] = this.parseApiResponse(rentCastMatch.rentCastApiSaleJsonData);
            const rentCastPropertyResponses: RentCastResponse[] = this.parseApiResponse(rentCastMatch.rentCastApiSaleJsonData);

            if (isValidData(rentCastSalesResponses, rentCastPropertyResponses)) {
                throw new Error('There should only be 1 listing response per "rent_cast_api_response" table row');
            }

            const rentCastSaleResponseType: RentCastSaleResponseType = this.createRentCastSaleResponseType(rentCastSalesResponses[0]);
            const rentCastPropertyResponseType: RentCastPropertyResponseType = this.createRentCastPropertyResponseType(rentCastPropertyResponses[0]);


            if (listingsWithRentCastIds.has(rentCastMatch.rentCastSaleResponseId)) {
                // Update current listing in database
                const preExistingListing: ListingDetails = listingsWithRentCastIds.get(rentCastMatch.rentCastSaleResponseId);
                const listingDetail: ListingDetailsDTO = this.buildListingDetails(
                    rentCastSaleResponseType,
                    rentCastPropertyResponseType,
                    preExistingListing,
                );
                // Need to create an update listingdetails sql function 
            }
            else {
                // Create new listing in database
                const listingDetail: ListingDetailsDTO = this.buildListingDetails(
                    rentCastSaleResponseType,
                    rentCastPropertyResponseType,
                );
                const newListingId = await new CalcService().insertListingDetails(
                    listingDetail,
                    ListingCreationType.MATCHED_PRE_EXISTING_RENT_CAST_DATA,
                    rentCastMatch.rentCastSaleResponseId,
                    rentCastMatch.rentCastPropertyResponseId,
                );

                if (newListingId > -1) {
                    numberOfPropertiesAdded++;
                }

            }
        }

        return numberOfPropertiesAdded;
    }

    private async _addNewPropertyWithRentCastAPI(rentCastApiRequest: CreateRentCastApiRequest): Promise<number> {

        const saleApiResponse: RentCastApiResponse = await this.rentCastApiClient.callRentCastApi(
            RentCastEndPoint.SALE,
            rentCastApiRequest,
        );

        const rentCastSalesResponses: RentCastResponse[] = this.parseApiResponse(saleApiResponse.jsonData);

        console.log("rentCastSalesResponses:", rentCastSalesResponses);

        const rentCastPropertyResponses: RentCastResponse[] = [];

        let propertyApiResponse: RentCastApiResponse;
        if (rentCastApiRequest.retrieveExtraData) {

            propertyApiResponse = await this.rentCastApiClient.callRentCastApi(
                RentCastEndPoint.PROPERTIES,
                rentCastApiRequest,
            );

            if (propertyApiResponse) {
                rentCastPropertyResponses.push(...this.parseApiResponse(propertyApiResponse.jsonData));
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

    private async persistNewListingAndRentCastDetails(
        rentCastSaleResponses: RentCastResponse[],
        rentCastPropertyResponses: RentCastResponse[],
        rentCastSaleApiCallId: number,
        rentCastPropertyApiCallId: number,
    ): Promise<number> {

        const client = await this.pool.connect();
        let numberOfPropertiesAdded = 0;

        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            numberOfPropertiesAdded = await this._persistNewListingAndRentCastDetails(
                rentCastSaleResponses,
                rentCastPropertyResponses,
                rentCastSaleApiCallId,
                rentCastPropertyApiCallId,
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

    private async _persistNewListingAndRentCastDetails(
        rentCastSaleResponses: RentCastResponse[],
        rentCastPropertyResponses: RentCastResponse[],
        rentCastSaleApiCallId: number,
        rentCastPropertyApiCallId: number,
    ): Promise<number> {

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

                const rentCastSaleResponseType: RentCastSaleResponseType = this.createRentCastSaleResponseType(rentCastSaleResponse);

                if (rentCastPropertyApiCallId > -1 && (rentCastSaleResponse.id in rentCastPropertyMap)) {
                    const rentCastProperty: RentCastResponse = rentCastPropertyMap[rentCastSaleResponse.id];
                    rentCastPropertyResponseId = await this.rentCastManager.insertRentCastApiResponse(this.pool, rentCastProperty, rentCastPropertyApiCallId);

                    listingDetail = this.buildListingDetails(
                        rentCastSaleResponseType,
                        this.createRentCastPropertyResponseType(rentCastProperty)
                    );
                    addressIdOfMatchesFound.add(rentCastSaleResponse.id);
                }
                else {
                    listingDetail = this.buildListingDetails(
                        rentCastSaleResponseType
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

    private createRentCastSaleResponseType(rentCastSalesResponse: RentCastResponse): RentCastSaleResponseType {
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
    }

    private createRentCastPropertyResponseType(rentCastSalesResponse: RentCastResponse): RentCastPropertyResponseType {

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
    }

    private buildListingDetails(
        rentCastSalesResponseTyped: RentCastSaleResponseType,
        rentCastPropertyTyped?: RentCastPropertyResponseType,
        listingDetails?: ListingDetails,
    ): ListingDetailsDTO {
        return new ListingDetailsDTOBuilder(
            rentCastSalesResponseTyped,
            rentCastPropertyTyped,
            listingDetails,
        ).build();
    }

    private parseApiResponse(jsonData: any): RentCastResponse[] {
        console.log("_data2:", jsonData); // Log the response data

        const rentCastResponses: RentCastResponse[] = [];

        // Check if jsonData is an array
        if (Array.isArray(jsonData)) {
            // Iterate through each object in the array
            for (const property of jsonData) {
                rentCastResponses.push(new RentCastResponse(property.id, property));
            }
        } else if (typeof jsonData === 'object' && jsonData !== null) {
            // Handle the case where jsonData is a single object
            rentCastResponses.push(new RentCastResponse(jsonData.id, jsonData));
        } else {
            throw new Error(`Unexpected data format: ${jsonData}`);
        }

        return rentCastResponses;
    }

    private getEndpoint(rentCastEndPoint: RentCastEndPoint): string {
        return this.rentCastApiClient.getEndpoint(rentCastEndPoint);
    }


}