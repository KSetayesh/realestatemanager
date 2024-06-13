import { Injectable } from '@nestjs/common';
import { CreateInvestmentScenarioRequest, ListingWithScenariosResponseDTO } from '@realestatemanager/types';
import { CalculationsApiClient } from "src/modules/realestatecalc/api/calculations.api.client";
import { ListingDetails } from "src/modules/realestatecalc/models/listingdetails.model";

@Injectable()
export class CalculationsCacheHandler {

    private calculationsApiClient: CalculationsApiClient;

    constructor(
        calculationsApiClient: CalculationsApiClient,
    ) {
        this.calculationsApiClient = calculationsApiClient;
    }

    async setNewCache(listingDetailsArr: ListingDetails[]): Promise<void> {
        const response = await this.calculationsApiClient.setFreshCache(listingDetailsArr);
        if (!response.ok) {
            throw new Error(`Failed to set new cache: ${response.status} ${response.statusText}`);
        }
    }

    async getFromCache(listingDetails: ListingDetails[]): Promise<ListingWithScenariosResponseDTO[]> {
        console.log('About to call getFromCache, length of list is: ', listingDetails.length);
        const response: Response = await this.calculationsApiClient.getFromCache(listingDetails);
        if (!response.ok) {
            throw new Error(`Failed to get from cache: ${response.status} ${response.statusText}`);
        }
        const listingWithScenariosList: ListingWithScenariosResponseDTO[] = await response.json();
        return listingWithScenariosList;
    }

    async updateCache(listingDetails: ListingDetails[], forceUpdate: boolean): Promise<void> {
        const response = await this.calculationsApiClient.setCache(listingDetails, forceUpdate);
        if (!response.ok) {
            throw new Error(`Failed to update cache: ${response.status} ${response.statusText}`);
        }
    }

    async deleteFromCache(listingDetailIds: number[]): Promise<void> {
        const response = await this.calculationsApiClient.deleteFromCache(listingDetailIds);
        if (!response.ok) {
            throw new Error(`Failed to delete from cache: ${response.status} ${response.statusText}`);
        }
    }

    async calculate(listingDetails: ListingDetails, investmentScenarioRequest: CreateInvestmentScenarioRequest): Promise<ListingWithScenariosResponseDTO> {
        const response: Response = await this.calculationsApiClient.calculate(listingDetails, investmentScenarioRequest);
        if (!response.ok) {
            throw new Error(`Failed to calculate: ${response.status} ${response.statusText}`);
        }
        const listingWithScenarios: ListingWithScenariosResponseDTO = await response.json();
        return listingWithScenarios;
    }

}