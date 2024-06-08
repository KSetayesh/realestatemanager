import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import {
    AmortizationBreakdownResponseDTO,
    CreateFilteredPropertyListRequest,
    CreateGetAllPropertiesRequest,
    CreateInvestmentScenarioRequest,
    CreateListingDetailsRequest,
    CreatePropertiesInBulkRequest,
    CreateUpdatePropertyRequest,
    ListingCreationType,
    ListingWithScenariosResponseDTO,
    AddPropertyTitlesAndLabels,
    TitleAndName
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listing_models/listingdetails.model';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { ListingDetailsRequestBuilder } from '../builders/listing.details.request.builder';
import { ListingDetailsUpdateBuilder } from '../builders/listing.details.update.builder';
import { DatabaseService } from 'src/db/database.service';
import { InvestmentCalculationManager } from 'src/calculations/investment.calculation.manager';
import { InvestmentMetricBuilder } from 'src/calculations/builder/investment.metric.builder';
import { InvestmentCalculator } from 'src/calculations/investment.calculator';
import { AddPropertyTitlesAndLabelsGetter } from '@realestatemanager/shared';
import { PropertyStatus } from '@realestatemanager/shared';
import { State } from '@realestatemanager/shared';
import { Country } from '@realestatemanager/shared';
import { PropertyType } from '@realestatemanager/shared';

@Injectable()
export class CalcService {

    // private listingManager: ListingManager;
    private pool: Pool;
    private cache: Map<number, ListingWithScenariosResponseDTO>;

    // constructor() {
    //     // this.listingManager = DatabaseManagerFactory.createListingManager();
    //     // this.pool = DatabaseManagerFactory.getDbPool();
    //     this.cache = new Map<number, ListingWithScenariosResponseDTO>();
    // }


    constructor(
        private readonly databaseService: DatabaseService,
        private readonly listingManager: ListingManager
    ) {
        this.pool = this.databaseService.getPool();
        this.cache = new Map<number, ListingWithScenariosResponseDTO>();
    }

    async setCache(): Promise<void> {
        const listingDetailsArr: ListingDetails[] = await this.listingManager.getAllListings(this.pool);
        for (const listingDetails of listingDetailsArr) {
            const investmentCalculationManager: InvestmentCalculationManager = new InvestmentCalculationManager(this.cache, listingDetails);
            investmentCalculationManager.setCache();
        }
    }

    async getAllProperties(getAllPropertiesRequest?: CreateGetAllPropertiesRequest): Promise<ListingWithScenariosResponseDTO[]> {

        const investmentScenarioRequest: CreateInvestmentScenarioRequest = getAllPropertiesRequest?.investmentScenarioRequest;
        if (!this.isValidInvestmentScenarioRequest(investmentScenarioRequest)) {
            throw new Error('Not a valid Investment Scenario Request');
        }
        const filteredPropertyListRequest: CreateFilteredPropertyListRequest = getAllPropertiesRequest?.filteredPropertyListRequest;

        const listingWithScenariosArr: ListingWithScenariosResponseDTO[] = [];
        const listingDetailsArr: ListingDetails[] = await this.listingManager.getAllListings(this.pool, filteredPropertyListRequest);

        for (const listingDetails of listingDetailsArr) {
            const investmentCalculationManager: InvestmentCalculationManager = new InvestmentCalculationManager(
                this.cache,
                listingDetails,
                investmentScenarioRequest
            );
            const listingWithScenariosDTO: ListingWithScenariosResponseDTO = investmentCalculationManager.getListingDetailsCalculations();
            listingWithScenariosArr.push(listingWithScenariosDTO);
        }

        return listingWithScenariosArr;
    }

    async updateProperty(createUpdatePropertyRequest: CreateUpdatePropertyRequest): Promise<ListingWithScenariosResponseDTO> {
        const zillowURL = createUpdatePropertyRequest.propertyIdentifier.zillowURL;

        // Fetch the listing details before update
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);

        // TODO implement all the methods in ListingDetailsUpdateBuilder
        // Update the listing details 
        const updatedListingDetails: ListingDetails = new ListingDetailsUpdateBuilder(
            listingDetails,
            createUpdatePropertyRequest,
        ).build();

        await this.listingManager.updateListingDetails(this.pool, updatedListingDetails);

        // Fetch the updated data
        const updatedListingDetailsFromDb: ListingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);

        const createInvestmentScenarioRequest: CreateInvestmentScenarioRequest = {
            propertyIdentifier: createUpdatePropertyRequest.propertyIdentifier,
            useDefaultRequest: true,
        };

        return this.calculate(createInvestmentScenarioRequest, updatedListingDetailsFromDb);
    }

    async getPropertyByZillowURL(
        zillowURL: string,
        investmentScenarioRequest?: CreateInvestmentScenarioRequest
    ): Promise<ListingWithScenariosResponseDTO> {
        if (!zillowURL) {
            throw new Error('zillowURL query parameter is required');
        }
        if (!this.isValidInvestmentScenarioRequest(investmentScenarioRequest)) {
            throw new Error('Not a valid Investment Scenario Request');
        }
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownResponseDTO = investmentCalc.createInvestmentMetrics();
        return {
            listingDetails: listingDetails.toDTO(),
            metrics: metrics,
        };
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
            if (await this.addNewProperty(listingDetailsReq)) {
                listingsAdded++;
            }
        }

        console.log('Csv file is valid');

        return listingsAdded;
    }


    async addNewProperty(listingDetailsRequest: CreateListingDetailsRequest): Promise<boolean> {
        let newListingId = -1;
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            const listingDetails: ListingDetails = new ListingDetailsRequestBuilder(listingDetailsRequest).build();
            console.log('listingDetails:', listingDetails);
            newListingId = await this.insertListingDetails(listingDetails, ListingCreationType.MANUAL);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
            return newListingId > -1;
        }
    }

    async insertListingDetails(
        listingDetails: ListingDetails,
        listingCreationType: ListingCreationType,
    ): Promise<number> {
        return this.listingManager.insertListingDetails(
            this.pool,
            listingDetails,
            listingCreationType,
        );
    }

    async calculate(
        investmentScenarioRequest: CreateInvestmentScenarioRequest,
        listingDetails?: ListingDetails
    ): Promise<ListingWithScenariosResponseDTO> {

        if (!listingDetails) {
            const zillowURL = investmentScenarioRequest.propertyIdentifier.zillowURL;
            listingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);
        }

        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownResponseDTO = investmentCalc.createInvestmentMetrics();
        return {
            listingDetails: listingDetails.toDTO(),
            metrics: metrics,
        };
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


}

