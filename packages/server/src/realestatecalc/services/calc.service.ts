import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import {
    AmortizationBreakdownResponseDTO,
    CreateFilteredPropertyListRequest,
    CreateGetAllPropertiesRequest,
    CreateInvestmentScenarioRequest,
    CreateListingDetailsRequest,
    ListingCreationType,
    ListingWithScenariosResponseDTO,
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listing_models/listingdetails.model';
import { InvestmentMetricBuilder } from '../builders/investment.metric.builder';
import { InvestmentCalculator } from '../models/investment_models/investment.calculator';
import { DatabaseManagerFactory } from 'src/db/realestate/dbfactory';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { ListingDetailsRequestBuilder } from '../builders/listing.details.request.builder';
import { InvestmentCalculationManager } from '../models/investment_models/investment.calculation.manager';

@Injectable()
export class CalcService {

    private listingManager: ListingManager;
    private pool: Pool;
    private cache: Map<number, ListingWithScenariosResponseDTO>;

    constructor() {
        this.listingManager = DatabaseManagerFactory.createListingManager();
        this.pool = DatabaseManagerFactory.getDbPool();
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

    async getPropertyByZillowURL(zillowURL: string, investmentScenarioRequest?: CreateInvestmentScenarioRequest): Promise<ListingWithScenariosResponseDTO> {
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


    async addNewProperty(listingDetailsRequest: CreateListingDetailsRequest): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            const listingDetails: ListingDetails = new ListingDetailsRequestBuilder(listingDetailsRequest).build();
            console.log('listingDetails:', listingDetails);
            const newListingId = await this.insertListingDetails(listingDetails, ListingCreationType.MANUAL);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
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

    async calculate(investmentScenarioRequest: CreateInvestmentScenarioRequest): Promise<ListingWithScenariosResponseDTO> {
        const zillowURL = investmentScenarioRequest.propertyIdentifier.zillowURL;
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);
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

