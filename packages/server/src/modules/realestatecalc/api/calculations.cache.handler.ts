import { Injectable } from '@nestjs/common';
import { CreateInvestmentScenarioRequest, ListingWithScenariosResponseDTO } from '@realestatemanager/shared';
import { Pool } from 'pg';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { CalculationsApiClient } from "src/modules/realestatecalc/api/calculations.api.client";
import { ListingDetails } from "src/modules/realestatecalc/models/listingdetails.model";

@Injectable()
export class CalculationsCacheHandler {

    private enableCacheUpdates: boolean;
    private calculationsApiClient: CalculationsApiClient;
    private listingManager: ListingManager;

    constructor(
        enableCacheUpdates: boolean,
        calculationsApiClient: CalculationsApiClient,
        listingManager: ListingManager
    ) {
        this.enableCacheUpdates = enableCacheUpdates;
        this.calculationsApiClient = calculationsApiClient;
        this.listingManager = listingManager;
    }

    async setNewCacheIfNeeded(pool: Pool): Promise<void> {
        if (this.enableCacheUpdates) {
            console.log('\n---Setting property cache---\n');
            const listingDetailsArr: ListingDetails[] = await this.listingManager.getAllListings(pool);
            await this.calculationsApiClient.setFreshCache(listingDetailsArr);
        }
    }

    // Doensn't update, delete, or add to Calculation Cache (just fetches from it), no need to check for enableCacheUpdates
    async getFromCache(listingDetails: ListingDetails[]): Promise<ListingWithScenariosResponseDTO[]> {
        return this.calculationsApiClient.getFromCache(listingDetails);
    }

    async updateCacheIfNeeded(
        pool: Pool,
        zillowUrls: string[],
        forceUpdate: boolean,
        condition: boolean = true): Promise<void> {

        if (this.enableCacheUpdates && condition) {
            await this.updateCacheInBackground(pool, zillowUrls, forceUpdate);
        }
    }

    async deleteFromCacheIfNeeded(listingDetailsId: number, condition: boolean): Promise<void> {
        if (this.enableCacheUpdates && condition) {
            await this.deleteFromCacheInBackground(listingDetailsId);
        }
    }

    // Doens't hit Calculation Cache, no need to check for enableCacheUpdates
    async calculate(listingDetails: ListingDetails, investmentScenarioRequest: CreateInvestmentScenarioRequest): Promise<ListingWithScenariosResponseDTO> {
        return this.calculationsApiClient.calculate(listingDetails, investmentScenarioRequest);
    }

    private async updateCacheInBackground(pool: Pool, zillowUrls: string[], forceUpdate: boolean): Promise<void> {
        try {
            const listingDetailsFromDb: ListingDetails[] = await this.listingManager.getPropertiesByZillowURL(pool, zillowUrls);
            if (listingDetailsFromDb && listingDetailsFromDb.length > 0) {
                await this.calculationsApiClient.setCache(listingDetailsFromDb, forceUpdate);
            }
        } catch (error) {
            console.error(`Failed to update cache for Zillow URL: ${zillowUrls}`, error);
        }
    }

    private async deleteFromCacheInBackground(listingDetailsId: number): Promise<void> {
        // Perform cache deletion asynchronously
        await this.calculationsApiClient.deleteFromCache(listingDetailsId).then(() => {
            console.log(`Cache deletion initiated for listing ID: ${listingDetailsId}`);
        });
    }

}