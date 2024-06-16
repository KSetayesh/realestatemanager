import { Injectable } from "@nestjs/common";
import { ApiClient, Method } from "../../../shared/api.client";
import {
    CreateInvestmentScenarioRequest,
    CreateListingDetailsCalculationsRequest,
    ListingDetailsResponseDTO,
    CreateSetCacheRequest,
} from "@realestatemanager/types";
import applicationConfig from '../../../config/applicationConfig';
import { EndpointDetails } from "../../../shared/endpoint.details.interface";
import { ListingDetails } from "../models/listingdetails.model";

export enum CaclulationEndPoint {
    CALCULATE_IN_BULK = 'CALCULATE_IN_BULK',
    SET = 'SET',
    RESET = 'RESET',
    SET_FRESH_CACHE = 'SET_FRESH_CACHE',
    DELETE = 'DELETE',
    CALCULATE = 'CALCULATE',
};

@Injectable()
export class CalculationsApiClient extends ApiClient {

    private cache: string = 'cache';

    private endPointMap: Record<CaclulationEndPoint, EndpointDetails> = {
        [CaclulationEndPoint.CALCULATE_IN_BULK]: {
            endPoint: `calculateinbulk`,
        },
        [CaclulationEndPoint.SET]: {
            endPoint: `set`,
        },
        [CaclulationEndPoint.RESET]: {
            endPoint: `reset`,
        },
        [CaclulationEndPoint.SET_FRESH_CACHE]: {
            endPoint: 'setFreshCache',
        },
        [CaclulationEndPoint.DELETE]: {
            endPoint: 'delete',
        },
        [CaclulationEndPoint.CALCULATE]: {
            endPoint: 'calculate',
        },
    };

    constructor() {
        super(
            applicationConfig.calculationsApiUrl,
        );
    }

    async calculate(listingDetails: ListingDetails, investmentScenarioRequest: CreateInvestmentScenarioRequest): Promise<Response> {
        const endPointDetails: EndpointDetails = this.constructUrl(CaclulationEndPoint.CALCULATE);
        const requestBody: CreateListingDetailsCalculationsRequest = {
            listingDetails: listingDetails.toDTO(),
            investmentScenarioRequest: investmentScenarioRequest,
        };
        return this._makeApiCall(endPointDetails.endPoint, JSON.stringify(requestBody), Method.POST);
    }

    async deleteFromCache(listingDetailsId: number[]): Promise<Response> {
        const endPointDetails: EndpointDetails = this.constructUrl(CaclulationEndPoint.DELETE);
        return this._makeApiCall(endPointDetails.endPoint, JSON.stringify(listingDetailsId), Method.POST);
    }

    async resetCache(): Promise<Response> {
        const endPointDetails: EndpointDetails = this.constructUrl(CaclulationEndPoint.RESET);
        return this._makeApiCall(endPointDetails.endPoint, undefined, Method.POST);
    }

    async setCache(listingDetailsList: ListingDetails[], forceUpdate: boolean): Promise<Response> {
        const endPointDetails: EndpointDetails = this.constructUrl(CaclulationEndPoint.SET);
        const listingDetailsListDTO: ListingDetailsResponseDTO[] = listingDetailsList.map(listingDetails => listingDetails.toDTO());
        const requestBody: CreateSetCacheRequest = {
            listingDetailsList: listingDetailsListDTO,
            forceUpdate: forceUpdate,
        };
        return this._makeApiCall(endPointDetails.endPoint, JSON.stringify(requestBody), Method.POST);
    }

    async setFreshCache(listingDetails: ListingDetails[]): Promise<Response> {
        const endPointDetails: EndpointDetails = this.constructUrl(CaclulationEndPoint.SET_FRESH_CACHE);
        const listingDetailsDTOArr: ListingDetailsResponseDTO[] = listingDetails.map(listingDetails => listingDetails.toDTO());
        return this._makeApiCall(endPointDetails.endPoint, JSON.stringify(listingDetailsDTOArr), Method.POST);
    }

    async getFromCalcServer(listingDetailsToGetFromCalcServer: CreateListingDetailsCalculationsRequest[]): Promise<Response> {
        const endPointDetails: EndpointDetails = this.constructUrl(CaclulationEndPoint.CALCULATE_IN_BULK);
        // const listingDetailsDTO: ListingDetailsResponseDTO[] = listingDetailsArr.map(listing => listing.toDTO());
        return this._makeApiCall(endPointDetails.endPoint, JSON.stringify(listingDetailsToGetFromCalcServer), Method.POST);
    }

    private async _makeApiCall(url: string, requestBody?: string, method: Method = Method.GET): Promise<Response> {
        return this.makeApiCall(undefined, url, requestBody, method);
    }

    private constructUrl(endPointEnum: CaclulationEndPoint): EndpointDetails {
        return {
            endPoint: `${this.baseApiUrl}/${this.cache}/${this.endPointMap[endPointEnum].endPoint}`
        };
    }

}