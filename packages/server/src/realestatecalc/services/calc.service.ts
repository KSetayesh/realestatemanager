import fetch from 'node-fetch';
import apiKeysConfig from '../../config/apiKeysConfig';
import { Injectable } from '@nestjs/common';
import {
    AmortizationBreakdownDTO,
    InvestmentScenarioRequest,
    ListingDetailsDTO,
    ListingWithScenariosDTO,
    RentCastApiRequestDTO,
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listing_models/listingdetails.model';
import { InvestmentMetricBuilder } from '../builders/investment.metric.builder';
import { InvestmentCalculator } from '../models/investment_models/investment.calculator';
import { ListingManager } from 'src/db/realestate/listing.db';
import { RentCastManager } from 'src/db/realestate/rentcast.db';
import { RentCastDetails } from '../models/rent_cast_api_models/rentcastdetails.model';

@Injectable()
export class CalcService {

    private listingManager: ListingManager;
    private rentCastManager: RentCastManager;

    constructor() {
        this.listingManager = new ListingManager();
        this.rentCastManager = new RentCastManager();
    }

    async getAllProperties(investmentScenarioRequest?: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO[]> {
        const listingWithScenariosArr: ListingWithScenariosDTO[] = [];
        const listingDetailsArr: ListingDetails[] = await this.listingManager.getAllListings();
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
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(zillowURL);
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails, investmentScenarioRequest);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownDTO = investmentCalc.createInvestmentMetrics();
        return {
            listingDetails: listingDetails.toDTO(),
            metrics: metrics,
        };
    }

    async addNewProperty(listingDetailsDTO: ListingDetailsDTO): Promise<void> {
        this.listingManager.insertListingDetails(listingDetailsDTO);
    }

    async addNewPropertyWithRentCastAPI(rentCastApiRequest: RentCastApiRequestDTO): Promise<any> {

        console.log("In addNewPropertyWithRentCastAPI!");
        console.log("requestData:", rentCastApiRequest);

        if (!apiKeysConfig.canMakeRentCastApiCall) {
            console.log(`"canMakeRentCastApiCall" is set to false in .env`);
            return;
        }

        const rentCastDetails: RentCastDetails = await this.rentCastManager.getRentCastDetails();

        if (!rentCastDetails.canMakeFreeApiCall()) {
            console.log(`Number of rent cast api calls has exceeded ${rentCastDetails.numberOfFreeApiCalls}`);
            return;
        }

        const createURL = (
            rentCastApiRequest: RentCastApiRequestDTO
        ): string => {

            const appendUrlParameter = (
                property: string,
                value: string,
                firstAppended: boolean,
            ): string => {
                const space = '%20';
                value = value.replace(/ /g, space);
                const returnValue = `${property}=${value}`;
                if (firstAppended) {
                    return `?${returnValue}`;
                }
                else {
                    return `&${returnValue}`;
                }
            };

            let appendToUrl = '';
            let firstAppended = true;
            if (rentCastApiRequest.address) {
                appendToUrl += appendUrlParameter('address', rentCastApiRequest.address, firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.city) {
                appendToUrl += appendUrlParameter('city', rentCastApiRequest.city, firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.state) {
                appendToUrl += appendUrlParameter('state', rentCastApiRequest.state, firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.zipCode) {
                appendToUrl += appendUrlParameter('zipCode', rentCastApiRequest.zipCode, firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.latitude) {
                appendToUrl += appendUrlParameter('latitude', rentCastApiRequest.latitude.toString(), firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.longitude) {
                appendToUrl += appendUrlParameter('longitude', rentCastApiRequest.longitude.toString(), firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.radius) {
                appendToUrl += appendUrlParameter('radius', rentCastApiRequest.radius.toString(), firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.propertyType) {
                appendToUrl += appendUrlParameter('propertyType', rentCastApiRequest.propertyType, firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.bedrooms) {
                appendToUrl += appendUrlParameter('bedrooms', rentCastApiRequest.bedrooms.toString(), firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.bathrooms) {
                appendToUrl += appendUrlParameter('bathrooms', rentCastApiRequest.bathrooms.toString(), firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.status) {
                appendToUrl += appendUrlParameter('status', rentCastApiRequest.status, firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.daysOld) {
                appendToUrl += appendUrlParameter('daysOld', rentCastApiRequest.daysOld.toString(), firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.limit) {
                appendToUrl += appendUrlParameter('limit', rentCastApiRequest.limit.toString(), firstAppended);
                firstAppended = false;
            }
            if (rentCastApiRequest.offset) {
                appendToUrl += appendUrlParameter('offset', rentCastApiRequest.offset.toString(), firstAppended);
                firstAppended = false;
            }
            return `https://api.rentcast.io/v1/listings/sale${appendToUrl}`;
            // return 'https://api.rentcast.io/v1/listings/sale?city=Austin&state=TX&status=Active&limit=5';
        };

        const url = createURL(rentCastApiRequest);
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Api-Key': apiKeysConfig.rentCastApiKey,
            }
        };
        fetch(url, options)
            .then(async res => {
                if (res.status === 200) {
                    console.log("Is successful!");

                    // Call updateNumberOfApiCalls here
                    await this.rentCastManager.updateNumberOfApiCalls();

                    const data = await res.json();
                    console.log(data); // Log the response data
                } else {
                    console.log("Is NOT successful!");
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
            })
            .catch(err => console.error('error:' + err));


    }

    async calculate(investmentScenarioRequest: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO> {
        const zillowURL = investmentScenarioRequest.propertyIdentifier.zillowURL;
        const listingDetails: ListingDetails = await this.listingManager.getPropertyByZillowURL(zillowURL);
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

