import {
    AmortizationBreakdownResponseDTO,
    ListingWithScenariosResponseDTO,
} from "@realestatemanager/shared";
import { InvestmentCalculator } from "./investment.calculator";
import applicationConfig from 'src/config/applicationConfig';
import { ListingDetails } from "src/modules/realestatecalc/models/listing_models/listingdetails.model";
import { InvestmentMetricBuilder } from "./builder/investment.metric.builder";

export class InvestmentCalculationCache {

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

    resetCache(): void {
        if (!this.usePropertyCache) {
            return;
        }
        this.cache.clear();
    }

    async setCache(listingDetails: ListingDetails): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }

        this.cacheUpdateQueue.push(listingDetails);
        if (!this.cacheUpdateInProgress) {
            this.processCacheUpdateQueue(false);
        }
    }

    async setCacheForce(listingDetails: ListingDetails): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }

        this.cacheUpdateQueue.push(listingDetails);
        if (!this.cacheUpdateInProgress) {
            this.processCacheUpdateQueue(true);
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

        const listingWithScenarios = this.createInvestmentMetrics(listingDetails);
        // this.cache.set(listingDetails.id, listingWithScenarios);
        return listingWithScenarios;
    }

    deleteFromCache(listingDetailsId: number): boolean {
        if (!this.usePropertyCache) {
            return false;
        }
        if (this.cache.has(listingDetailsId)) {
            this.cache.delete(listingDetailsId);
            console.log(`Deleted key ${listingDetailsId} from cache.`);
            return true;
        } else {
            console.log(`Key ${listingDetailsId} not found in cache.`);
            return false;
        }
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
