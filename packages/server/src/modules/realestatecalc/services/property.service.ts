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
    PaginationDetails,
    CreateFilteredPropertyListRequest,
} from '@realestatemanager/types';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { ListingDetailsRequestBuilder } from '../builders/listing.details.request.builder';
import { ListingDetailsUpdateBuilder } from '../builders/listing.details.update.builder';
import { AddPropertyTitlesAndLabelsGetter } from '@realestatemanager/types';
import { PropertyStatus } from '@realestatemanager/types';
import { State } from '@realestatemanager/types';
import { Country } from '@realestatemanager/types';
import { PropertyType } from '@realestatemanager/types';
import { ListingDetails } from '../models/listingdetails.model';
import { CalculationsCacheHandler } from '../api/calculations.cache.handler';


@Injectable()
export class PropertyService {

    constructor(
        private readonly cacheHandler: CalculationsCacheHandler,
        private readonly listingManager: ListingManager,
    ) { }

    async getAllProperties(
        pool: Pool,
        getAllPropertiesRequest?: CreateGetAllPropertiesRequest
    ): Promise<ListingWithScenariosResponseDTO[]> {

        const investmentScenarioRequest = getAllPropertiesRequest?.investmentScenarioRequest;
        if (!this.isValidInvestmentScenarioRequest(investmentScenarioRequest)) {
            throw new Error('Not a valid Investment Scenario Request');
        }
        const filteredPropertyListRequest = getAllPropertiesRequest?.filteredPropertyListRequest;
        const paginationDetails: PaginationDetails = getAllPropertiesRequest?.paginationDetails;

        const getPaginationLimit = (paginationDetails: PaginationDetails): number => {
            if (!paginationDetails || paginationDetails.limit > 100) {
                return 100;
            }
            return paginationDetails.limit;
        };

        // const setFilteredPropertyLimit = (filteredPropertyListRequest: CreateFilteredPropertyListRequest): void => {
        //     if (filteredPropertyListRequest && filteredPropertyListRequest.limit > 1000) {
        //         filteredPropertyListRequest.limit = 1000;
        //     }
        // };

        paginationDetails.limit = getPaginationLimit(paginationDetails);
        // setFilteredPropertyLimit(filteredPropertyListRequest);

        const listingDetailsArr: ListingDetails[] = await this.listingManager.getAllListings(pool, filteredPropertyListRequest);

        // Start by fetching the listing details of the new property from the database asynchronously.
        // This ensures the loop does not wait for these operations to complete before continuing.
        // For this reason we DO NOT want to "await" on the updateCacheInBackground function.
        // this.updateCacheIfNeeded(zillowUrls, false);

        return this.getCalcResults(listingDetailsArr);

    }

    async updateProperty(pool: Pool, createUpdatePropertyRequest: CreateUpdatePropertyRequest): Promise<ListingWithScenariosResponseDTO> {
        const zillowURL = createUpdatePropertyRequest.propertyIdentifier.zillowURL;

        // Fetch the listing details before update
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(
            pool,
            zillowURL
        );

        // TODO implement all the methods in ListingDetailsUpdateBuilder
        // Update the listing details 
        const updatedListingDetails: ListingDetails = new ListingDetailsUpdateBuilder(
            listingDetails,
            createUpdatePropertyRequest,
        ).build();

        await this.updateListingDetails(pool, updatedListingDetails);

        const updatedListingDetailsFromDb: ListingDetails = await this.listingManager.getPropertyByZillowURL(
            pool,
            zillowURL
        );

        const listingsFromCache: ListingWithScenariosResponseDTO[] = await this.getCalcResults([updatedListingDetailsFromDb]);
        return listingsFromCache[0];

    }

    async updateListingDetails(pool: Pool, updatedListingDetails: ListingDetails): Promise<void> {
        await this.listingManager.updateListingDetails(pool, updatedListingDetails);
    }

    async deleteListingDetails(pool: Pool, zillowURL: string): Promise<boolean> {
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(pool, zillowURL);
        let didDelete: boolean = false;
        if (listingDetails) {
            didDelete = await this.listingManager.deleteListingByZillowURL(pool, zillowURL);
        } else {
            console.log(`${zillowURL} does not exist in the database to delete`);
            return false;
        }

        console.log(`${zillowURL} has been deleted: ${didDelete}`);

        return didDelete;
    }

    async addPropertiesInBulk(pool: Pool, propertiesInBulk: CreatePropertiesInBulkRequest): Promise<number> {
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
        const zillowUrls: string[] = [];

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

            if ((await this.addNewProperty(pool, listingDetailsReq)) > 0) {
                zillowUrls.push(listingDetailsReq.zillowURL);
                listingsAdded++;
            }
        }

        console.log('Csv file is valid');

        return listingsAdded;
    }

    async addNewProperty(pool: Pool, listingDetailsRequest: CreateListingDetailsRequest): Promise<number> {
        let newListingId = -1;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            const listingDetails: ListingDetails = new ListingDetailsRequestBuilder(listingDetailsRequest).build();
            console.log('listingDetails:', listingDetails);
            newListingId = await this.insertListingDetails(
                pool,
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
        pool: Pool,
        listingDetails: ListingDetails,
        listingCreationType: ListingCreationType,
    ): Promise<number> {
        const newListingId = await this.listingManager.insertListingDetails(
            pool,
            listingDetails,
            listingCreationType,
        );

        return newListingId;
    }

    /* 
        We don't want to update or fetch from cache here because 
        the cache only has default CreateInvestmentScenarioRequest 
    */
    async calculate(
        pool: Pool,
        investmentScenarioRequest: CreateInvestmentScenarioRequest,
        listingDetails?: ListingDetails
    ): Promise<ListingWithScenariosResponseDTO> {

        if (!listingDetails) {
            const zillowURL = investmentScenarioRequest.propertyIdentifier.zillowURL;
            listingDetails = await this.listingManager.getPropertyByZillowURL(pool, zillowURL);
        }
        return this.cacheHandler.calculate(listingDetails, investmentScenarioRequest);
    }

    async getListingsByRentCastSaleResponseIds(pool: Pool, rentCastSaleResponseIds: number[]): Promise<ListingDetails[]> {
        return this.listingManager.getListingsByRentCastSaleResponseIds(pool, rentCastSaleResponseIds);
    }

    private isValidInvestmentScenarioRequest(investmentScenarioRequest?: CreateInvestmentScenarioRequest): boolean {
        return !investmentScenarioRequest || investmentScenarioRequest.useDefaultRequest || !!investmentScenarioRequest.investmentDetails;
    }

    private async getCalcResults(listingDetailsList: ListingDetails[]): Promise<ListingWithScenariosResponseDTO[]> {
        return this.cacheHandler.getCalcResults(listingDetailsList);
    }

}