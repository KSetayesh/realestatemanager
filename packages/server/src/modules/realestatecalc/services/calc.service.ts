import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import {
    CreateGetAllPropertiesRequest,
    CreateInvestmentScenarioRequest,
    CreateListingDetailsRequest,
    CreateUpdatePropertyRequest,
    ListingCreationType,
    ListingWithScenariosResponseDTO,
    AddPropertyTitlesAndLabels,
    CreatePropertiesInBulkRequest,
    TitleAndName,
} from '@realestatemanager/shared';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { ListingDetailsRequestBuilder } from '../builders/listing.details.request.builder';
import { ListingDetailsUpdateBuilder } from '../builders/listing.details.update.builder';
import { DatabaseService } from 'src/db/database.service';
import { AddPropertyTitlesAndLabelsGetter } from '@realestatemanager/shared';
import { PropertyStatus } from '@realestatemanager/shared';
import { State } from '@realestatemanager/shared';
import { Country } from '@realestatemanager/shared';
import { PropertyType } from '@realestatemanager/shared';
import { CalculationsApiClient } from '../api/calculations.api.client';
import { ListingDetails } from '../models/listingdetails.model';

@Injectable()
export class CalcService {

    private pool: Pool;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly calculationsApiClient: CalculationsApiClient,
        private readonly listingManager: ListingManager
    ) {
        this.pool = this.databaseService.getPool();
        this.setNewCache();
    }

    async getAllProperties(getAllPropertiesRequest?: CreateGetAllPropertiesRequest): Promise<ListingWithScenariosResponseDTO[]> {
        const investmentScenarioRequest = getAllPropertiesRequest?.investmentScenarioRequest;
        if (!this.isValidInvestmentScenarioRequest(investmentScenarioRequest)) {
            throw new Error('Not a valid Investment Scenario Request');
        }

        const filteredPropertyListRequest = getAllPropertiesRequest?.filteredPropertyListRequest;
        // const listingWithScenariosArr: ListingWithScenariosResponseDTO[] = [];
        const listingDetailsArr: ListingDetails[] = await this.listingManager.getAllListings(this.pool, filteredPropertyListRequest);

        listingDetailsArr.forEach(listingDetails => {
            // Start by fetching the listing details of the new property from the database asynchronously.
            // This ensures the loop does not wait for these operations to complete before continuing.
            // For this reason we DO NOT want to "await" on the updateCacheInBackground function.
            this.updateCacheInBackground(listingDetails.zillowURL, false);
        });

        return this.getFromCache(listingDetailsArr);

        // return listingWithScenariosArr;
    }

    async updateProperty(createUpdatePropertyRequest: CreateUpdatePropertyRequest): Promise<ListingWithScenariosResponseDTO> {
        const zillowURL = createUpdatePropertyRequest.propertyIdentifier.zillowURL;

        // Fetch the listing details before update
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(
            this.pool,
            zillowURL
        );

        // TODO implement all the methods in ListingDetailsUpdateBuilder
        // Update the listing details 
        const updatedListingDetails: ListingDetails = new ListingDetailsUpdateBuilder(
            listingDetails,
            createUpdatePropertyRequest,
        ).build();

        await this.updateListingDetails(updatedListingDetails);

        const updatedListingDetailsFromDb: ListingDetails = await this.listingManager.getPropertyByZillowURL(
            this.pool,
            zillowURL
        );

        const listingsFromCache: ListingWithScenariosResponseDTO[] = await this.getFromCache([updatedListingDetailsFromDb]);
        return listingsFromCache[0];

    }

    async updateListingDetails(updatedListingDetails: ListingDetails): Promise<void> {
        await this.listingManager.updateListingDetails(this.pool, updatedListingDetails);

        // Start by fetching the listing details of the new property from the database asynchronously.
        // This ensures the loop does not wait for these operations to complete before continuing.
        // For this reason we DO NOT want to "await" on the updateCacheInBackground function.
        this.updateCacheInBackground(updatedListingDetails.zillowURL, true);
    }

    async deleteListingDetails(zillowURL: string): Promise<boolean> {
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);
        let didDelete: boolean = false;
        if (listingDetails) {
            didDelete = await this.listingManager.deleteListingDetails(this.pool, zillowURL);
        } else {
            console.log(`${zillowURL} does not exist in the database to delete`);
            return false;
        }

        console.log(`${zillowURL} has been deleted: ${didDelete}`);

        if (didDelete) {
            // Perform cache deletion asynchronously. 
            // For this reason we DO NOT want to await on deleteFromCacheInBackground() function
            this.deleteFromCacheInBackground(listingDetails.id);
        }

        return didDelete;
    }

    async addPropertiesInBulk(propertiesInBulk: CreatePropertiesInBulkRequest): Promise<number> {
        console.log('propertiesInBulk:', propertiesInBulk);

        const validateRequest = (propertiesInBulk: CreatePropertiesInBulkRequest): boolean => {
            const csvData: Record<string, string | number>[] = propertiesInBulk.csvData;
            // Check if csvData is not empty
            if (csvData.length === 0) {
                throw new Error('CSV File cannot be empty');
            }

            // Extract keys from the first object
            const columnHeaders: Record<string, string | number> = csvData[0];
            const keysArray: string[] = Object.keys(columnHeaders).sort();

            const propertyTitles: string[] = (Object.keys(AddPropertyTitlesAndLabels).map(key => {
                const titleAndName: TitleAndName = AddPropertyTitlesAndLabels[key];
                return titleAndName.title;
            })).sort();

            const arraysAreEqual = (arr1: string[], arr2: string[]): boolean => {
                if (arr1.length !== arr2.length) {
                    return false;
                }

                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] !== arr2[i]) {
                        return false;
                    }
                }

                return true;
            };

            return arraysAreEqual(keysArray, propertyTitles);
        };

        if (!validateRequest(propertiesInBulk)) {
            throw new Error('Invalid CSV file, check to see if column headers are correct');
        }

        const getterInstance: AddPropertyTitlesAndLabelsGetter = new AddPropertyTitlesAndLabelsGetter();
        let listingsAdded = 0;

        for (const row of propertiesInBulk.csvData) {
            const listingDetailsReq: CreateListingDetailsRequest = {
                zillowURL: row[getterInstance.zillowURLTitle].toString(),
                listingPrice: Number(row[getterInstance.listingPriceTitle]),
                numberOfDaysOnMarket: Number(row[getterInstance.numberOfDaysOnMarketTitle]),
                propertyStatus: row[getterInstance.propertyStatusTitle] as PropertyStatus,
                propertyDetails: {
                    address: {
                        fullAddress: row[getterInstance.fullAddressTitle].toString(),
                        state: row[getterInstance.stateTitle] as State,
                        zipcode: row[getterInstance.zipcodeTitle].toString(),
                        city: row[getterInstance.cityTitle].toString(),
                        county: row[getterInstance.countyTitle].toString(),
                        country: row[getterInstance.countryTitle] as Country,
                        streetAddress: row[getterInstance.streetAddressTitle].toString(),
                        apartmentNumber: row[getterInstance.apartmentNumberTitle].toString(),
                        longitude: Number(row[getterInstance.longitudeTitle]),
                        latitude: Number(row[getterInstance.latitudeTitle]),
                    },
                    schoolRating: {
                        elementarySchoolRating: Number(row[getterInstance.elementarySchoolRatingTitle]),
                        middleSchoolRating: Number(row[getterInstance.middleSchoolRatingTitle]),
                        highSchoolRating: Number(row[getterInstance.highSchoolRatingTitle]),
                    },
                    numberOfBedrooms: Number(row[getterInstance.numberOfBedroomsTitle]),
                    numberOfFullBathrooms: Number(row[getterInstance.numberOfFullBathroomsTitle]),
                    numberOfHalfBathrooms: Number(row[getterInstance.numberOfHalfBathroomsTitle]),
                    squareFeet: Number(row[getterInstance.squareFeetTitle]),
                    acres: Number(row[getterInstance.acresTitle]),
                    yearBuilt: Number(row[getterInstance.yearBuiltTitle]),
                    hasGarage: row[getterInstance.hasGarageTitle].toString().toLocaleLowerCase() === 'true',
                    hasPool: row[getterInstance.hasPoolTitle].toString().toLocaleLowerCase() === 'true',
                    hasBasement: row[getterInstance.hasBasementTitle].toString().toLocaleLowerCase() === 'true',
                    propertyType: row[getterInstance.propertyTypeTitle] as PropertyType,
                    description: row[getterInstance.descriptionTitle].toString(),
                },
                zillowMarketEstimates: {
                    zestimate: Number(row[getterInstance.zestimateTitle]), // Estimated market value
                    zestimateRange: {
                        low: Number(row[getterInstance.zestimateRangeLowTitle]),
                        high: Number(row[getterInstance.zestimateRangeHighTitle]),
                    },
                    zillowRentEstimate: Number(row[getterInstance.zillowRentEstimateTitle]), // Estimated rental value
                    zillowMonthlyPropertyTaxAmount: Number(row[getterInstance.zillowMonthlyPropertyTaxAmountTitle]),
                    zillowMonthlyHomeInsuranceAmount: Number(row[getterInstance.zillowMonthlyHomeInsuranceAmountTitle]),
                    zillowMonthlyHOAFeesAmount: Number(row[getterInstance.zillowMonthlyHOAFeesAmountTitle]),
                },
            };
            console.log('ListingDetails:', listingDetailsReq);

            if ((await this.addNewProperty(listingDetailsReq)) > -1) {
                // Start by fetching the listing details of the new property from the database asynchronously.
                // This ensures the loop does not wait for these operations to complete before continuing.
                // For this reason we DO NOT want to "await" on the updateCacheInBackground function.
                this.updateCacheInBackground(listingDetailsReq.zillowURL, false);

                listingsAdded++;
            }
        }

        console.log('Csv file is valid');

        return listingsAdded;
    }

    async addNewProperty(listingDetailsRequest: CreateListingDetailsRequest): Promise<number> {
        let newListingId = -1;
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            const listingDetails: ListingDetails = new ListingDetailsRequestBuilder(listingDetailsRequest).build();
            console.log('listingDetails:', listingDetails);
            newListingId = await this.insertListingDetails(
                listingDetails,
                ListingCreationType.MANUAL
            );

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
            return newListingId;
        }
    }

    async insertListingDetails(
        listingDetails: ListingDetails,
        listingCreationType: ListingCreationType,
    ): Promise<number> {
        const newListingId = await this.listingManager.insertListingDetails(
            this.pool,
            listingDetails,
            listingCreationType,
        );

        // Start by fetching the listing details of the new property from the database asynchronously.
        // This ensures the loop does not wait for these operations to complete before continuing.
        // For this reason we DO NOT want to "await" on the updateCacheInBackground function.
        this.updateCacheInBackground(listingDetails.zillowURL, false);

        return newListingId;
    }

    /* 
        We don't want to update or fetch from cache here because 
        the cache only has default CreateInvestmentScenarioRequest 
    */
    async calculate(
        investmentScenarioRequest: CreateInvestmentScenarioRequest,
        listingDetails?: ListingDetails
    ): Promise<ListingWithScenariosResponseDTO> {

        if (!listingDetails) {
            const zillowURL = investmentScenarioRequest.propertyIdentifier.zillowURL;
            listingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);
        }

        return this._calculate(investmentScenarioRequest, listingDetails);

    }


    async getListingsByRentCastSaleResponseIds(pool: Pool, rentCastSaleResponseIds: number[]): Promise<ListingDetails[]> {
        const listingDetails: ListingDetails[] = await this.listingManager.getListingsByRentCastSaleResponseIds(pool, rentCastSaleResponseIds);

        for (const listing of listingDetails) {
            // Start by fetching the listing details of the new property from the database asynchronously.
            // This ensures the loop does not wait for these operations to complete before continuing.
            // For this reason we DO NOT want to "await" on the updateCacheInBackground function.
            this.updateCacheInBackground(listing.zillowURL, false);
        }

        return listingDetails;
    }

    private isValidInvestmentScenarioRequest(investmentScenarioRequest?: CreateInvestmentScenarioRequest): boolean {
        if (investmentScenarioRequest) {
            if (investmentScenarioRequest.useDefaultRequest) {
                return true;
            }
            else if (!investmentScenarioRequest.investmentDetails) {
                return false;
            }
        }
        return true;
    }

    private async _calculate(
        investmentScenarioRequest: CreateInvestmentScenarioRequest,
        listingDetails?: ListingDetails
    ): Promise<ListingWithScenariosResponseDTO> {
        return this.calculationsApiClient.calculate(listingDetails, investmentScenarioRequest);
    }

    private async getFromCache(listingDetails: ListingDetails[]): Promise<ListingWithScenariosResponseDTO[]> {
        return this.calculationsApiClient.getFromCache(listingDetails);
    }

    private async deleteFromCacheInBackground(listingDetailsId: number): Promise<void> {
        // Perform cache deletion asynchronously
        await this.calculationsApiClient.deleteFromCache(listingDetailsId).then(() => {
            console.log(`Cache deletion initiated for listing ID: ${listingDetailsId}`);
        });
    }

    private async updateCacheInBackground(zillowURL: string, forceUpdate: boolean): Promise<void> {
        try {
            const listingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);
            await this.calculationsApiClient.setCache([listingDetails], forceUpdate);
        } catch (error) {
            console.error(`Failed to update cache for Zillow URL: ${zillowURL}`, error);
        }
    }

    private async setNewCache(): Promise<void> {
        console.log('\n---Setting property cache---\n');
        const listingDetailsArr: ListingDetails[] = await this.listingManager.getAllListings(this.pool);
        await this.calculationsApiClient.setFreshCache(listingDetailsArr);
    }

}

