import { Injectable } from '@nestjs/common';
import { RealEstateManager } from 'src/db/realestate/realestate.db';
import {
    AmortizationBreakdownDTO,
    InvestmentScenarioRequest,
    ListingDetailsDTO,
    ListingWithScenariosDTO,
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listing_models/listingdetails.model';
import { InvestmentMetricBuilder } from '../builders/investment.metric.builder';
import { InvestmentCalculator } from '../models/investment_models/txn4/calc/investment.calculator';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;

    constructor() {
        this.realEstateManager = new RealEstateManager();
    }

    async getAllProperties(investmentScenarioRequest?: InvestmentScenarioRequest): Promise<any> { //<ListingWithScenariosDTO[]> {
        const listingWithScenariosArr: ListingWithScenariosDTO[] = [];
        const listingDetailsArr: ListingDetails[] = await this.realEstateManager.getAllListings();
        let data: AmortizationBreakdownDTO;
        for (const listingDetails of listingDetailsArr) {
            const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
            const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
            data = investmentCalc.createInvestmentMetrics();
            break;
            // const investmentMetricsDTO: InvestmentMetricsResponseDTO = investmentCalc.createInvestmentMetrics();
            // const listingWithScenariosDTO: ListingWithScenariosDTO = {
            //     listingDetails: listingDetails.toDTO(),
            //     metrics: [investmentMetricsDTO]
            // };
            // listingWithScenariosArr.push(listingWithScenariosDTO);
        }
        // return listingWithScenariosArr;
        return data;
    }

    async getPropertyByZillowURL(zillowURL: string, investmentScenarioRequest?: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO> {
        const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        investmentCalc.createInvestmentMetrics();
        return;
        // const investmentMetricsDTO: InvestmentMetricsResponseDTO = investmentScenario.createInvestmentMetrics();
        // return {
        //     listingDetails: listingDetails.toDTO(),
        //     metrics: [investmentMetricsDTO]
        // };
    }

    async addNewProperty(listingDetailsDTO: ListingDetailsDTO): Promise<void> {
        this.realEstateManager.insertListingDetails(listingDetailsDTO);
    }

    async calculate(investmentScenarioRequest: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO> {
        const zillowURL = investmentScenarioRequest.propertyIdentifier.zillowURL;
        const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        investmentCalc.createInvestmentMetrics();
        return;
        // const investmentScenario: InvestmentScenario = investmentMetricsBuilder.build();
        // const investmentMetricsDTO: InvestmentMetricsResponseDTO = investmentScenario.createInvestmentMetrics();
        // return {
        //     listingDetails: listingDetails.toDTO(),
        //     metrics: [investmentMetricsDTO]
        // };
    }


}

