import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import {
    AmortizationBreakdownDTO,
    CreateListingDetailsRequest,
    InvestmentScenarioRequest,
    ListingCreationType,
    ListingWithScenariosDTO,
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listing_models/listingdetails.model';
import { InvestmentMetricBuilder } from '../builders/investment.metric.builder';
import { InvestmentCalculator } from '../models/investment_models/investment.calculator';
import { DatabaseManagerFactory } from 'src/db/realestate/dbfactory';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { ListingDetailsBuilder } from '../builders/listing.details.builder';
import { ListingDetailsRequestBuilder } from '../builders/listing.details.request.builder';

@Injectable()
export class CalcService {

    private listingManager: ListingManager;
    private pool: Pool;

    constructor() {
        this.listingManager = DatabaseManagerFactory.createListingManager();
        this.pool = DatabaseManagerFactory.getDbPool();
    }

    async getAllProperties(investmentScenarioRequest?: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO[]> {
        const listingWithScenariosArr: ListingWithScenariosDTO[] = [];
        const listingDetailsArr: ListingDetails[] = await this.listingManager.getAllListings(this.pool);
        for (const listingDetails of listingDetailsArr) {
            const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
            const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
            const metrics: AmortizationBreakdownDTO = investmentCalc.createInvestmentMetrics();

            const listingWithScenariosDTO: ListingWithScenariosDTO = {
                listingDetails: listingDetails.toDTO(),
                metrics: metrics,
            };

            listingWithScenariosArr.push(listingWithScenariosDTO);
        }
        return listingWithScenariosArr;
    }

    async getPropertyByZillowURL(zillowURL: string, investmentScenarioRequest?: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO> {
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownDTO = investmentCalc.createInvestmentMetrics();
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
        saleResponseId?: number,
        propertyResponseId?: number,
    ): Promise<number> {
        return this.listingManager.insertListingDetails(
            this.pool,
            listingDetails,
            listingCreationType,
            saleResponseId,
            propertyResponseId
        );
    }

    async calculate(investmentScenarioRequest: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO> {
        const zillowURL = investmentScenarioRequest.propertyIdentifier.zillowURL;
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(this.pool, zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownDTO = investmentCalc.createInvestmentMetrics();
        return {
            listingDetails: listingDetails.toDTO(),
            metrics: metrics,
        };
    }


}

