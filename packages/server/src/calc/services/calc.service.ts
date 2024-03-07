import { Injectable } from '@nestjs/common';
import { RealEstateManager } from 'src/db/realestate/realestate.db';
import {
    InvestmentMetricsResponseDTO,
    InvestmentScenarioRequest,
    ListingDetailsDTO,
    ListingWithScenariosDTO,
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listing_models/listingdetails.model';
import { InvestmentScenario } from '../models/investment_models/investment.scenario.model';
import { InvestmentMetricBuilder } from '../builders/investment.metric.builder';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;

    constructor() {
        this.realEstateManager = new RealEstateManager();
    }

    async getAllProperties(investmentScenarioRequest?: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO[]> {
        const listingWithScenariosArr: ListingWithScenariosDTO[] = [];
        const listingDetailsArr: ListingDetails[] = await this.realEstateManager.getAllListings();
        for (const listingDetails of listingDetailsArr) {
            const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
            const investmentScenario: InvestmentScenario = investmentMetricsBuilder.build();
            const investmentMetricsDTO: InvestmentMetricsResponseDTO = investmentScenario.createInvestmentMetrics();
            const listingWithScenariosDTO: ListingWithScenariosDTO = {
                listingDetails: listingDetails.toDTO(),
                metrics: [investmentMetricsDTO]
            };
            listingWithScenariosArr.push(listingWithScenariosDTO);
        }
        return listingWithScenariosArr;
    }

    async getPropertyByZillowURL(zillowURL: string, investmentScenarioRequest?: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO> {
        const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentScenario: InvestmentScenario = investmentMetricsBuilder.build();
        const investmentMetricsDTO: InvestmentMetricsResponseDTO = investmentScenario.createInvestmentMetrics();
        return {
            listingDetails: listingDetails.toDTO(),
            metrics: [investmentMetricsDTO]
        };
    }

    async addNewProperty(listingDetailsDTO: ListingDetailsDTO): Promise<void> {
        this.realEstateManager.insertListingDetails(listingDetailsDTO);
    }


}
