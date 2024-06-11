import { Injectable } from "@nestjs/common";
import { ApiClient, Method } from "../../../shared/api.client";
import {
    CreateInvestmentScenarioRequest,
    CreateListingDetailsCalculationsRequest,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO,
    CreateSetCacheRequest,
} from "@realestatemanager/shared";
import applicationConfig from '../../../config/applicationConfig';
import { EndpointDetails } from "../../../shared/endpoint.details.interface";
import { ListingDetails } from "../models/listingdetails.model";

export enum CaclulationEndPoint {
    GET = 'GET',
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
        [CaclulationEndPoint.GET]: {
            endPoint: `get`,
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

    async calculate(listingDetails: ListingDetails, investmentScenarioRequest: CreateInvestmentScenarioRequest): Promise<ListingWithScenariosResponseDTO> {
        const getUrlObj: EndpointDetails = this.constructUrl(CaclulationEndPoint.CALCULATE);
        const requestBody: CreateListingDetailsCalculationsRequest = {
            listingDetails: listingDetails.toDTO(),
            investmentScenarioRequest: investmentScenarioRequest,
        };
        return this._makeApiCall(getUrlObj.endPoint, JSON.stringify(requestBody), Method.POST);
    }

    async deleteFromCache(listingDetailsId: number): Promise<void> {
        const createDeleteUrl = (listingDetailsId: number): string => {
            const getUrlObj: EndpointDetails = this.constructUrl(CaclulationEndPoint.DELETE);
            return `${getUrlObj.endPoint}/${listingDetailsId}`;
        };

        return this._makeApiCall(createDeleteUrl(listingDetailsId), undefined, Method.DELETE);
    }

    async resetCache(): Promise<void> {
        const getUrlObj: EndpointDetails = this.constructUrl(CaclulationEndPoint.RESET);
        return this._makeApiCall(getUrlObj.endPoint, undefined, Method.POST);
    }

    async setCache(listingDetailsList: ListingDetails[], forceUpdate: boolean): Promise<void> {
        const getUrlObj: EndpointDetails = this.constructUrl(CaclulationEndPoint.SET);
        const listingDetailsListDTO: ListingDetailsResponseDTO[] = listingDetailsList.map(listingDetails => listingDetails.toDTO());
        const requestBody: CreateSetCacheRequest = {
            listingDetailsList: listingDetailsListDTO,
            forceUpdate: forceUpdate,
        };
        return this._makeApiCall(getUrlObj.endPoint, JSON.stringify(requestBody), Method.POST);
    }

    async setFreshCache(listingDetails: ListingDetails[]): Promise<void> {
        const getUrlObj: EndpointDetails = this.constructUrl(CaclulationEndPoint.SET_FRESH_CACHE);
        const listingDetailsDTOArr: ListingDetailsResponseDTO[] = listingDetails.map(listingDetails => listingDetails.toDTO());
        return this._makeApiCall(getUrlObj.endPoint, JSON.stringify(listingDetailsDTOArr), Method.POST);
    }

    async getFromCache(listingDetailsArr: ListingDetails[]): Promise<ListingWithScenariosResponseDTO[]> {
        const getUrlObj: EndpointDetails = this.constructUrl(CaclulationEndPoint.GET);
        const listingDetailsDTO: ListingDetailsResponseDTO[] = listingDetailsArr.map(listing => listing.toDTO());
        return this._makeApiCall(getUrlObj.endPoint, JSON.stringify(listingDetailsDTO), Method.POST);
    }

    private async _makeApiCall(url: string, requestBody?: string, method: Method = Method.GET): Promise<any> {
        return this.makeApiCall(undefined, url, requestBody, method);
    }

    private constructUrl(endPointEnum: CaclulationEndPoint): EndpointDetails {
        return {
            endPoint: `${this.baseApiUrl}/${this.cache}/${this.endPointMap[endPointEnum].endPoint}`
        };
    }

}