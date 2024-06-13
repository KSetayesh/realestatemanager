import { Injectable } from '@nestjs/common';
import { CreateInvestmentScenarioRequest, ListingWithScenariosResponseDTO } from '@realestatemanager/shared';
import { CalculationsApiClient } from "src/modules/realestatecalc/api/calculations.api.client";
import { ListingDetails } from "src/modules/realestatecalc/models/listingdetails.model";

@Injectable()
export class CalculationsCacheHandler {

    private enableCacheUpdates: boolean;
    private calculationsApiClient: CalculationsApiClient;

    constructor(
        enableCacheUpdates: boolean,
        calculationsApiClient: CalculationsApiClient,
    ) {
        this.enableCacheUpdates = enableCacheUpdates;
        this.calculationsApiClient = calculationsApiClient;
    }

    async setNewCache(listingDetailsArr: ListingDetails[]): Promise<void> {
        await this.calculationsApiClient.setFreshCache(listingDetailsArr);
    }

    // Doensn't update, delete, or add to Calculation Cache (just fetches from it), no need to check for enableCacheUpdates
    async getFromCache(listingDetails: ListingDetails[]): Promise<ListingWithScenariosResponseDTO[]> {
        return this.calculationsApiClient.getFromCache(listingDetails);
    }

    async updateCache(
        listingDetails: ListingDetails[],
        forceUpdate: boolean): Promise<void> {
        await this.calculationsApiClient.setCache(listingDetails, forceUpdate);
    }

    async deleteFromCacheIfNeeded(listingDetailIds: number[]): Promise<void> {
        await this.calculationsApiClient.deleteFromCache(listingDetailIds);
    }

    // Doens't hit Calculation Cache, no need to check for enableCacheUpdates
    async calculate(listingDetails: ListingDetails, investmentScenarioRequest: CreateInvestmentScenarioRequest): Promise<ListingWithScenariosResponseDTO> {
        return this.calculationsApiClient.calculate(listingDetails, investmentScenarioRequest);
    }



}