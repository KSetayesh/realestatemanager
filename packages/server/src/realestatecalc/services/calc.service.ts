import fetch from 'node-fetch';
import apiKeysConfig from '../../config/apiKeysConfig';
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
import { InvestmentCalculator } from '../models/investment_models/investment.calculator';

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
        const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownDTO = investmentCalc.createInvestmentMetrics();
        return {
            listingDetails: listingDetails.toDTO(),
            metrics: metrics,
        };
    }

    async addNewProperty(listingDetailsDTO: ListingDetailsDTO): Promise<void> {
        this.realEstateManager.insertListingDetails(listingDetailsDTO);
    }

    async addNewPropertyWithRentCastAPI(): Promise<any> {

        console.log("In addNewPropertyWithRentCastAPI!");

        const url = 'https://api.rentcast.io/v1/listings/sale?city=Austin&state=TX&status=Active&limit=5';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Api-Key': apiKeysConfig.rentCastApiKey,
            }
        };

        fetch(url, options)
            .then(res => {
                if (res.status === 200) {
                    console.log("Is successful!");
                    const data = res.json();
                    return data;
                } else {
                    console.log("Is NOT successful!");
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
            })
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));

    }

    async calculate(investmentScenarioRequest: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO> {
        const zillowURL = investmentScenarioRequest.propertyIdentifier.zillowURL;
        const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownDTO = investmentCalc.createInvestmentMetrics();
        // return;
        // const investmentScenario: InvestmentScenario = investmentMetricsBuilder.build();
        // const investmentMetricsDTO: InvestmentMetricsResponseDTO = investmentScenario.createInvestmentMetrics();
        return {
            listingDetails: listingDetails.toDTO(),
            metrics: metrics,
        };
    }


}

