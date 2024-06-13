import { Injectable } from '@nestjs/common';
import {
    AmortizationBreakdownResponseDTO,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO,
} from '@realestatemanager/types';
import { InvestmentMetricBuilder } from 'src/calculations/builder/investment.metric.builder';
import { InvestmentCalculator } from 'src/calculations/investment.calculator';
import applicationConfig from 'src/config/applicationConfig';
import { CacheInterface } from './cache.interface';
import { Utility } from '@realestatemanager/utilities';

@Injectable()
export class CacheService implements CacheInterface {

    private cache: Map<number, ListingWithScenariosResponseDTO>;
    private usePropertyCache: boolean = applicationConfig.useCache;
    private cacheUpdateQueue: ListingDetailsResponseDTO[] = [];
    private cacheUpdateInProgress: boolean = false;

    constructor() {
        this.cache = new Map();
        console.log('CacheService instance created');
    }

    async setFreshCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }
        await this._setFreshCache(listingDetailsArr);
    }

    async resetCache(): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }

        await this._resetCache();
    }

    async deleteFromCache(listingDetailsIds: number[]): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }

        for (const listingDetailsId of listingDetailsIds) {
            await this._deleteFromCache(listingDetailsId);
        }
    }

    async setCache(listingDetailsList: ListingDetailsResponseDTO[], forceUpdate: boolean): Promise<void> {
        if (!this.usePropertyCache) {
            return;
        }

        for (const listingDetails of listingDetailsList) {
            await this._setCache(listingDetails, forceUpdate);
        }

    }

    async getFromCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<ListingWithScenariosResponseDTO[]> {
        console.log('size of cache before trying to get from it: ', this.cache.size);
        if (!this.usePropertyCache) {
            return listingDetailsArr.map(listingDetails => this.createInvestmentMetrics(listingDetails));
        }

        return Promise.all(listingDetailsArr.map(listingDetails => this._getFromCache(listingDetails)));
    }

    private async _setFreshCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<void> {
        await this.resetCache();

        console.log(`Setting cache with ${listingDetailsArr.length} properties.`);

        for (const listingDetail of listingDetailsArr) {
            const listingWithScenariosDTO: ListingWithScenariosResponseDTO = this.createInvestmentMetrics(
                listingDetail
            );
            this.cache.set(listingDetail.id, listingWithScenariosDTO);
        }

        console.log(`Fresh Cache has been set with ${this.cache.size} properties found in cache.`);
        for (const key of this.cache.keys()) {
            console.log(`key: ${key}, value: ${this.cache.get(key).listingDetails.id}`);
        }
    }

    private async _resetCache(): Promise<void> {

        // Wait until cache update is finished
        while (this.cacheUpdateInProgress) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        this.cache.clear();
        this.cacheUpdateQueue = [];
        console.log(`Cache has been reset.`);
    }

    private async _deleteFromCache(listingDetailsId: number): Promise<void> {

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

    }

    private async _setCache(listingDetails: ListingDetailsResponseDTO, forceUpdate: boolean): Promise<void> {

        this.cacheUpdateQueue.push(listingDetails);
        if (!this.cacheUpdateInProgress) {
            this.processCacheUpdateQueue(forceUpdate);
        }
    }

    private async _getFromCache(listingDetails: ListingDetailsResponseDTO): Promise<ListingWithScenariosResponseDTO> {
        const listingId: number = listingDetails.id;
        if (this.cache.has(listingId) && Utility.deepEqual(listingDetails, this.cache.get(listingId))) {
            console.log(`Property id ${listingId} has been found in cache`);
            return this.cache.get(listingId);
        }
        console.log(`Property id ${listingId} NOT found in cache`);
        return this.createInvestmentMetrics(listingDetails);
    }

    private async processCacheUpdateQueue(forceUpdate: boolean): Promise<void> {
        if (this.cacheUpdateInProgress) {
            return; // If already in progress, do not start a new processing loop
        }

        this.cacheUpdateInProgress = true;

        while (this.cacheUpdateQueue.length > 0) {
            const listingDetails = this.cacheUpdateQueue.shift();
            try {
                if (listingDetails && (forceUpdate || !this.cache.has(listingDetails.id))) {
                    const listingWithScenarios: ListingWithScenariosResponseDTO = this.createInvestmentMetrics(listingDetails);
                    this.cache.set(listingDetails.id, listingWithScenarios);
                    console.log(`Cache updated for listing ID: ${listingDetails.id}`);
                }
            } catch (error) {
                console.error(`Failed to update cache for listing ID: ${listingDetails.id}`, error);
            }
        }

        this.cacheUpdateInProgress = false;
    }

    private createInvestmentMetrics(listingDetails: ListingDetailsResponseDTO): ListingWithScenariosResponseDTO {
        const investmentMetricsBuilder = new InvestmentMetricBuilder(listingDetails);
        const investmentCalc: InvestmentCalculator = investmentMetricsBuilder.build();
        const metrics: AmortizationBreakdownResponseDTO = investmentCalc.createInvestmentMetrics();

        return {
            listingDetails: listingDetails,
            metrics: metrics,
        };
    }

}
