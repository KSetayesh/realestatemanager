import fetch from 'node-fetch';
import apiKeysConfig from '../../config/apiKeysConfig';
import { Injectable } from '@nestjs/common';
import {
    AmortizationBreakdownDTO,
    Country,
    InvestmentScenarioRequest,
    ListingDetailsDTO,
    ListingWithScenariosDTO,
    RentCastApiRequestDTO,
    RentCastDetailsDTO,
} from '@realestatemanager/shared';
import { ListingDetails } from '../models/listing_models/listingdetails.model';
import { InvestmentMetricBuilder } from '../builders/investment.metric.builder';
import { InvestmentCalculator } from '../models/investment_models/investment.calculator';
import { ListingManager } from 'src/db/realestate/listing.db';
import { RentCastManager } from 'src/db/realestate/rentcast.db';
import { RentCastDetails } from '../models/rent_cast_api_models/rentcastdetails.model';
import { RentCastResponse } from '../models/rent_cast_api_models/rentcastresponse.model';

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

    async getRentCastApiDetails(): Promise<RentCastDetailsDTO> {
        return (await this.rentCastManager.getRentCastDetails()).toDTO();
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

        if (!rentCastDetails.canMakeFreeApiCall) {
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

                    const parseApiResponse = (jsonData): RentCastResponse[] => {
                        const rentCastResponses: RentCastResponse[] = [];
                        // Iterate through each object in the array
                        for (const property of jsonData) {
                            const id = property.id;
                            const formattedAddress = property.formattedAddress ?? '';
                            const addressLine1 = property.addressLine1 ?? '';
                            const addressLine2 = property.addressLine2 ?? '';
                            const city = property.city ?? '';
                            const state = property.state ?? '';
                            const zipCode = property.zipCode ?? '';
                            const county = property.county ?? '';
                            const bedrooms = property.bedrooms ?? -1;
                            const bathrooms = property.bathrooms ?? -1;
                            const latitude = property.latitude ?? -1;
                            const longitude = property.longitude ?? -1;
                            const squareFootage = property.squareFootage ?? -1;
                            const propertyType = property.propertyType ?? '';
                            const lotSize = property.lotSize ?? -1;
                            const status = property.status ?? '';
                            const yearBuilt = property.yearBuilt ?? -1;
                            const price = property.price ?? -1;
                            const listedDate = property.listedDate ?? '';
                            const removedDate = property.removedDate ?? '';
                            const createdDate = property.createdDate ?? '';
                            const lastSeenDate = property.lastSeenDate ?? '';
                            const daysOnMarket = property.daysOnMarket ?? -1;


                            rentCastResponses.push(
                                new RentCastResponse(
                                    id,
                                    formattedAddress,
                                    addressLine1,
                                    addressLine2,
                                    city,
                                    state,
                                    zipCode,
                                    county,
                                    bedrooms,
                                    bathrooms,
                                    latitude,
                                    longitude,
                                    squareFootage,
                                    propertyType,
                                    lotSize,
                                    status,
                                    yearBuilt,
                                    price,
                                    listedDate,
                                    removedDate,
                                    createdDate,
                                    lastSeenDate,
                                    daysOnMarket,
                                )
                            );

                        }

                        return rentCastResponses;

                    };

                    const data = await res.json();
                    const rentCastResponses: RentCastResponse[] = parseApiResponse(data);
                    for (const rentCastResponse of rentCastResponses) {

                        await this.rentCastManager.insertRentCastApiResponse(rentCastResponse);

                        const listingDetail: ListingDetailsDTO = {
                            zillowURL: '',
                            propertyDetails: {
                                address: {
                                    fullAddress: rentCastResponse.formattedAddress,
                                    state: rentCastResponse.state,
                                    zipcode: rentCastResponse.zipCode,
                                    city: rentCastResponse.city,
                                    county: rentCastResponse.county,
                                    country: Country.UnitedStates,
                                    streetAddress: rentCastResponse.addressLine1,
                                    apartmentNumber: rentCastResponse.addressLine2,
                                    longitude: rentCastResponse.longitude,
                                    latitude: rentCastResponse.latitude,
                                },
                                schoolRating: {
                                    elementarySchoolRating: -1,
                                    middleSchoolRating: -1,
                                    highSchoolRating: -1,
                                },
                                numberOfBedrooms: rentCastResponse.bedrooms,
                                numberOfFullBathrooms: rentCastResponse.bathrooms,
                                numberOfHalfBathrooms: 0,
                                squareFeet: rentCastResponse.squareFootage,
                                acres: rentCastResponse.lotSize,
                                yearBuilt: rentCastResponse.yearBuilt,
                                hasGarage: false,
                                hasPool: false,
                                hasBasement: false,
                                propertyType: rentCastResponse.propertyType,
                                description: '',
                            },
                            zillowMarketEstimates: {
                                zestimate: -1,
                                zestimateRange: {
                                    low: -1,
                                    high: -1,
                                },
                                zillowRentEstimate: -1,
                                zillowMonthlyPropertyTaxAmount: -1,
                                zillowMonthlyHomeInsuranceAmount: -1,
                                zillowMonthlyHOAFeesAmount: -1,
                            },
                            listingPrice: rentCastResponse.price,
                            dateListed: rentCastResponse.listedDate,
                            numberOfDaysOnMarket: rentCastResponse.daysOnMarket,
                            propertyStatus: rentCastApiRequest.status,
                        };
                        await this.addNewProperty(listingDetail);
                    }
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

