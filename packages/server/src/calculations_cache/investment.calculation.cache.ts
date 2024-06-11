import {
    AmortizationBreakdownResponseDTO,
    ListingWithScenariosResponseDTO,
} from "@realestatemanager/shared";
import { InvestmentCalculator } from "../calculations/investment.calculator";
import applicationConfig from 'src/config/applicationConfig';
import { ListingDetails } from "src/modules/realestatecalc/models/listing_models/listingdetails.model";
import { InvestmentMetricBuilder } from "../calculations/builder/investment.metric.builder";
import { CacheInterface } from "./cache.interface";

export class InvestmentCalculationCache implements CacheInterface {

    private cache: Map<number, ListingWithScenariosResponseDTO>;
    private usePropertyCache: boolean = applicationConfig.useCache;
    private cacheUpdateQueue: ListingDetails[] = [];
    private cacheUpdateInProgress: boolean = false;

    constructor() {
        this.cache = new Map<number, ListingWithScenariosResponseDTO>();
    }

    async setFreshCache(listingDetailsArr: ListingDetails[]): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }

        this.resetCache();

        for (const listingDetail of listingDetailsArr) {
            const listingWithScenariosDTO: ListingWithScenariosResponseDTO = this.createInvestmentMetrics(
                listingDetail
            );
            this.cache.set(listingDetail.id, listingWithScenariosDTO);
        }
    }

    async resetCache(): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }

        // Wait until cache update is finished
        while (this.cacheUpdateInProgress) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        this.cache.clear();
        this.cacheUpdateQueue = [];
        console.log(`Cache has been reset.`);
    }

    async setCache(listingDetails: ListingDetails, forceUpdate: boolean): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }

        this.cacheUpdateQueue.push(listingDetails);
        if (!this.cacheUpdateInProgress) {
            this.processCacheUpdateQueue(forceUpdate);
        }
    }

    private async processCacheUpdateQueue(forceUpdate: boolean): Promise<void> {
        if (this.cacheUpdateQueue.length > 0) {
            this.cacheUpdateInProgress = true;
            const listingDetails = this.cacheUpdateQueue.shift()!;
            try {
                if (forceUpdate || !this.cache.has(listingDetails.id)) {
                    const listingWithScenarios: ListingWithScenariosResponseDTO = this.createInvestmentMetrics(listingDetails);
                    this.cache.set(listingDetails.id, listingWithScenarios);
                    console.log(`Cache updated for listing ID: ${listingDetails.id}`);
                }
            } catch (error) {
                console.error(`Failed to update cache for listing ID: ${listingDetails.id}`, error);
            }
            this.cacheUpdateInProgress = false;
            this.processCacheUpdateQueue(forceUpdate);
        }
    }

    getListingDetailsCalculations(listingDetails: ListingDetails): ListingWithScenariosResponseDTO {
        if (!this.usePropertyCache) {
            return this.createInvestmentMetrics(listingDetails);
        }

        if (this.cache.has(listingDetails.id)) {
            return this.cache.get(listingDetails.id);
        }

        return this.createInvestmentMetrics(listingDetails);
    }

    async deleteFromCache(listingDetailsId: number): Promise<boolean> {
        if (!this.usePropertyCache) {
            return false;
        }

        // Attempt to remove from cache and update queue first
        let wasDeleted = false;

        // Remove from cache if it exists
        if (this.cache.has(listingDetailsId)) {
            this.cache.delete(listingDetailsId);
            wasDeleted = true;
            console.log(`Deleted key ${listingDetailsId} from cache.`);
        }

        // Remove from update queue if it exists
        const indexInQueue = this.cacheUpdateQueue.findIndex(item => item.id === listingDetailsId);
        if (indexInQueue !== -1) {
            this.cacheUpdateQueue.splice(indexInQueue, 1);
            wasDeleted = true;
            console.log(`Deleted key ${listingDetailsId} from cache update queue.`);
        }

        // If deletion was not successful and cache update is in progress, wait until it finishes
        if (!wasDeleted && this.cacheUpdateInProgress) {
            while (this.cacheUpdateInProgress) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // Try deleting again after waiting
            if (this.cache.has(listingDetailsId)) {
                this.cache.delete(listingDetailsId);
                wasDeleted = true;
                console.log(`Deleted key ${listingDetailsId} from cache after waiting.`);
            }
        }

        if (!wasDeleted) {
            console.log(`Key ${listingDetailsId} not found in cache or update queue.`);
        }

        return wasDeleted;
    }

    private createInvestmentMetrics(listingDetails: ListingDetails): ListingWithScenariosResponseDTO {
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownResponseDTO = investmentCalc.createInvestmentMetrics();

        return {
            listingDetails: listingDetails.toDTO(),
            metrics: metrics,
        };
    }
}
