import { Pool } from 'pg';
import { CalculationsApiClient } from "src/modules/realestatecalc/api/calculations.api.client";
import { ListingDetails } from "src/modules/realestatecalc/models/listingdetails.model";

export class CalculationsCacheHandler {

    private hitCalcCache: boolean;
    private calculationsApiClient: CalculationsApiClient;

    constructor(hitCalcCache: boolean, calculationsApiClient: CalculationsApiClient) {
        this.hitCalcCache = hitCalcCache;
        this.calculationsApiClient = calculationsApiClient;
    }

    async updateCacheIfNeeded(
        listingDetails: ListingDetails[],
        forceUpdate: boolean,
        condition: boolean = true): Promise<void> {

        if (this.hitCalcCache && condition) {
            await this.calculationsApiClient.setCache(listingDetails, forceUpdate);
        }
    }

    async deleteFromCacheIfNeeded(listingDetailsId: number, condition: boolean): Promise<void> {
        if (this.hitCalcCache && condition) {
            await this.calculationsApiClient.deleteFromCache(listingDetailsId).then(() => {
                console.log(`Cache deletion initiated for listing ID: ${listingDetailsId}`);
            });
        }
    }

    private async updateCacheInBackground(pool: Pool, zillowURL: string, forceUpdate: boolean): Promise<void> {
        try {
            const listingDetails: ListingDetails | null = await this.getPropertyByZillowURL(pool, zillowURL);
            if (listingDetails) {
                await this.calculationsApiClient.setCache([listingDetails], forceUpdate);
            }
        } catch (error) {
            console.error(`Failed to update cache for Zillow URL: ${zillowURL}`, error);
        }
    }

    private async deleteFromCacheInBackground(listingDetailsId: number): Promise<void> {
        // Perform cache deletion asynchronously
        await this.calculationsApiClient.deleteFromCache(listingDetailsId).then(() => {
            console.log(`Cache deletion initiated for listing ID: ${listingDetailsId}`);
        });
    }

}