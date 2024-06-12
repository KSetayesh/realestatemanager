import { Pool } from 'pg';
import { Injectable } from "@nestjs/common";
import {
    Country,
    ListingCreationType,
    PropertyStatus,
    PropertyType,
    CreateRentCastApiRequest,
    RentCastDetailsResponseDTO,
    State,
} from "@realestatemanager/shared";
import { RentCastManager } from 'src/db/realestate/dbmanager/rentcast.manager';
import { DatabaseService } from 'src/db/database.service';
import { CalcService } from 'src/modules/realestatecalc/services/calc.service';
import { RentCastResponse } from 'src/modules/rentcast/models/rentcastresponse.model';
import { RentCastApiClient, RentCastApiResponse } from '../api/rent.cast.api.client';
import { RentCastEndPoint } from '../api/rent.cast.api.endpoint.manager';
import { RentCastMatchingData } from '../models/rentcastmatchingdata.model';
import { ListingDetails } from 'src/modules/realestatecalc/models/listingdetails.model';
import { ListingDetailsPropertyResponseBuilder } from '../builders/listing.details.property.response.builder';
import { ListingDetailsBuilder } from '../builders/listing.details.builder';

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

    private pool: Pool;

    constructor(
        private readonly calcService: CalcService,
        private readonly databaseService: DatabaseService,
        private readonly rentCastApiClient: RentCastApiClient,
        private readonly rentCastManager: RentCastManager,
    ) {
        this.pool = this.databaseService.getPool();
    }

    async getRentCastApiDetailsDTO(): Promise<RentCastDetailsResponseDTO[]> {
        return (await this.rentCastManager.getRentCastApiDetails(this.pool)).map(rentCastDetail => {
            return rentCastDetail.toDTO();
        });
    }

    async addNewPropertyWithRentCastAPI(rentCastApiRequest: CreateRentCastApiRequest): Promise<number> {
        let numberOfPropertiesAdded = await this._addNewPropertyWithRentCastAPI(rentCastApiRequest);
        console.log(`Number of properties added: ${numberOfPropertiesAdded}`);

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
        const listingDetails: ListingDetails[] = await this.calcService.getListingsByRentCastSaleResponseIds(this.pool, rentCastSaleResponseIds);

        for (const listingDetail of listingDetails) {
            const rentCastSaleResponseId = listingDetail.rentCastSaleResponseId;
            if (rentCastSaleResponseId && rentCastSaleResponseId > 0) {
                listingsWithRentCastIds.set(rentCastSaleResponseId, listingDetail);
            }
        }

        const isValidMatch = (rentCastSalesResponses: RentCastResponse[], rentCastPropertyResponses: RentCastResponse[]): boolean => {
            return rentCastSalesResponses.length == 1 && rentCastPropertyResponses.length == 1;
        };

        let numberOfPropertiesAdded = 0;
        let numberOfPropertiesUpdated = 0;
        for (const rentCastMatch of rentCastMatchingData) {
            const rentCastSalesResponses: RentCastResponse[] = this.parseApiResponse(rentCastMatch.rentCastApiSaleJsonData);
            const rentCastPropertyResponses: RentCastResponse[] = this.parseApiResponse(rentCastMatch.rentCastApiPropertyJsonData); //rentCastApiSaleJsonData);

            if (!isValidMatch(rentCastSalesResponses, rentCastPropertyResponses)) {
                throw new Error('There should only be 1 listing response per "rent_cast_api_response" table row');
            }

            const rentCastSaleResponseType: RentCastSaleResponseType = this.createRentCastSaleResponseType(rentCastSalesResponses[0]);
            const rentCastPropertyResponseType: RentCastPropertyResponseType = this.createRentCastPropertyResponseType(rentCastPropertyResponses[0]);


            if (listingsWithRentCastIds.has(rentCastMatch.rentCastSaleResponseId)) {
                // Update current listing in database
                const preExistingListing: ListingDetails = listingsWithRentCastIds.get(rentCastMatch.rentCastSaleResponseId);
                const listingDetail: ListingDetails = new ListingDetailsPropertyResponseBuilder(
                    rentCastMatch.rentCastPropertyResponseId,
                    preExistingListing,
                    rentCastPropertyResponseType,
                ).build();

                await this.calcService.updateListingDetails(listingDetail);
                numberOfPropertiesUpdated++;
            }
            else {
                // Create new listing in database
                const listingDetail: ListingDetails = this.buildListingDetails(
                    rentCastSaleResponseType,
                    rentCastMatch.rentCastSaleResponseId,
                    rentCastPropertyResponseType,
                    rentCastMatch.rentCastPropertyResponseId,
                );
                const newListingId = await this.calcService.insertListingDetails(
                    listingDetail,
                    ListingCreationType.MATCHED_PRE_EXISTING_RENT_CAST_DATA,
                );

                if (newListingId > 0) {
                    numberOfPropertiesAdded++;
                }

            }
        }

        console.log(`Number of properties updated: ${numberOfPropertiesUpdated}`);
        console.log(`Number of properties matched and created: ${numberOfPropertiesAdded}`);

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
                [rentCastProperty.addressId, rentCastProperty]));

        try {
            const addressIdOfMatchesFound = new Set<string>();
            let numberOfPropertiesAdded = 0;
            for (const rentCastSaleResponse of rentCastSaleResponses) {
                const addressIdFound = await this.rentCastManager.checkIfAddressIdExists(this.pool, rentCastSaleResponse.addressId);
                console.log("addressIdFound:", addressIdFound);
                if (addressIdFound) {
                    console.log(`${rentCastSaleResponse.addressId} already exists in the database, skipping`);
                    continue;
                }

                const rentCastSaleResponseId = await this.rentCastManager.insertRentCastApiResponse(
                    this.pool,
                    rentCastSaleResponse,
                    rentCastSaleApiCallId
                );

                let listingDetail: ListingDetails;

                const rentCastSaleResponseType: RentCastSaleResponseType = this.createRentCastSaleResponseType(rentCastSaleResponse);

                if (rentCastPropertyApiCallId > 0 && (rentCastSaleResponse.addressId in rentCastPropertyMap)) {
                    const rentCastProperty: RentCastResponse = rentCastPropertyMap[rentCastSaleResponse.addressId];
                    const rentCastPropertyResponseId = await this.rentCastManager.insertRentCastApiResponse(
                        this.pool,
                        rentCastProperty,
                        rentCastPropertyApiCallId
                    );
                    listingDetail = this.buildListingDetails(
                        rentCastSaleResponseType,
                        rentCastSaleResponseId,
                        this.createRentCastPropertyResponseType(rentCastProperty),
                        rentCastPropertyResponseId,
                    );
                    addressIdOfMatchesFound.add(rentCastSaleResponse.addressId);
                }
                else {
                    listingDetail = this.buildListingDetails(
                        rentCastSaleResponseType,
                        rentCastSaleResponseId,
                    );
                }

                const newListingId = await this.calcService.insertListingDetails(
                    listingDetail,
                    ListingCreationType.RENT_CAST_API,
                );

                if (newListingId > 0) {
                    numberOfPropertiesAdded++;
                }
            }

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
            id: rentCastSalesResponse.addressId,
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
            id: rentCastSalesResponse.addressId,
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
        rentCastSaleResponseId: number,
        rentCastPropertyTyped?: RentCastPropertyResponseType,
        rentCastPropertyResponseId?: number,
    ): ListingDetails {
        return new ListingDetailsBuilder(
            rentCastSalesResponseTyped,
            rentCastSaleResponseId,
            rentCastPropertyTyped,
            rentCastPropertyResponseId,
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
        return this.rentCastApiClient.getEndPointDetails(rentCastEndPoint).endPoint;
    }


}