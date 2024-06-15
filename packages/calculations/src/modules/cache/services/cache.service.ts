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

    private cache: Map<number, ListingWithScenariosResponseDTO> = new Map();
    private usePropertyCache: boolean = applicationConfig.useCache;
    private cacheUpdateQueue: ListingDetailsResponseDTO[] = [];
    private cacheUpdateInProgress: boolean = false;

    static instanceCounter = 0;

    constructor() {
        console.log('CacheService instance created');
        console.log(`usePropertyCache: ${this.usePropertyCache}`);
        CacheService.instanceCounter++;
        console.log('Constructor instance counter:', CacheService.instanceCounter);
    }

    async getCacheDetails(): Promise<any> {
        const contentArr = [...this.cache.keys()].map(key => ({
            key: key,
            fullAddress: this.cache.get(key).listingDetails.propertyDetails.address.fullAddress,
        }));
        return {
            length: this.cache.size,
            content: contentArr,
            queueLength: this.cacheUpdateQueue.length,
            cacheUpdateInProgress: this.cacheUpdateInProgress,
        };
    }

    async setFreshCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<void> {
        if (!this.usePropertyCache) {
            console.log('Property cache is disabled.');
            return;
        }
        console.log(`Setting cache with ${listingDetailsArr.length} properties.`);
        await this.resetCache();
        await this._setCache(listingDetailsArr, false);
        console.log(`Cache has been set with ${this.cache.size} properties.`);
    }

    async resetCache(): Promise<void> {
        if (!this.usePropertyCache) {
            console.log('Property cache is disabled.');
            return;
        }
        await this._resetCache();
    }

    async deleteFromCache(listingDetailsIds: number[]): Promise<void> {
        if (!this.usePropertyCache) {
            console.log('Property cache is disabled.');
            return;
        }
        for (const listingDetailsId of listingDetailsIds) {
            await this._deleteFromCache(listingDetailsId);
        }
    }

    async setCache(listingDetailsList: ListingDetailsResponseDTO[], forceUpdate: boolean): Promise<void> {
        if (!this.usePropertyCache) {
            console.log('Property cache is disabled.');
            return;
        }
        await this._setCache(listingDetailsList, forceUpdate);

    }

    async getFromCache(listingDetailsArr: ListingDetailsResponseDTO[]): Promise<ListingWithScenariosResponseDTO[]> {
        console.log('size of cache before trying to get from it: ', this.cache.size);
        if (!this.usePropertyCache) {
            console.log('Property cache is disabled. Creating investment metrics directly.');
            return listingDetailsArr.map(listingDetails => this.createInvestmentMetrics(listingDetails));
        }
        console.log(`Fetching ${listingDetailsArr.length} properties`);
        const listingWithScenarios: ListingWithScenariosResponseDTO[] = await Promise.all(listingDetailsArr.map(listingDetails => this._getFromCache(listingDetails)));
        console.log('Finished fetching all  properties');
        return listingWithScenarios;

    }

    private async _resetCache(): Promise<void> {
        while (this.cacheUpdateInProgress) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        this.cache.clear();
        this.cacheUpdateQueue = [];
        console.log(`Cache has been reset.`);
    }

    private async _deleteFromCache(listingDetailsId: number): Promise<void> {
        let wasDeleted = false;
        if (this.cache.has(listingDetailsId)) {
            this.cache.delete(listingDetailsId);
            wasDeleted = true;
            console.log(`Deleted key ${listingDetailsId} from cache.`);
        }
        const indexInQueue = this.cacheUpdateQueue.findIndex(item => item.id === listingDetailsId);
        if (indexInQueue !== -1) {
            this.cacheUpdateQueue.splice(indexInQueue, 1);
            wasDeleted = true;
            console.log(`Deleted key ${listingDetailsId} from cache update queue.`);
        }
        if (!wasDeleted && this.cacheUpdateInProgress) {
            while (this.cacheUpdateInProgress) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
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

    private async _setCache(listingDetailsList: ListingDetailsResponseDTO[], forceUpdate: boolean): Promise<void> {
        this.cacheUpdateQueue.push(...listingDetailsList);
        if (!this.cacheUpdateInProgress) {
            this.processCacheUpdateQueue(forceUpdate);
        }
    }

    private async _getFromCache(listingDetails: ListingDetailsResponseDTO): Promise<ListingWithScenariosResponseDTO> {
        const listingId: number = listingDetails.id;
        if (this.cache.has(listingId)) {
            const cachedListing: ListingWithScenariosResponseDTO = this.cache.get(listingId);
            if (Utility.deepEqual(cachedListing.listingDetails, listingDetails)) {
                console.log(`Property id ${listingId} has been found in cache and is identical.`);
                return cachedListing;
            }
            console.log(`Property id ${listingId} found in cache but is not identical.`);
        } else {
            console.log(`Property id ${listingId} NOT found in cache.`);
        }
        console.log(`Property id ${listingId} NOT found in cache`);
        return this.createInvestmentMetrics(listingDetails);
    }

    private async processCacheUpdateQueue(forceUpdate: boolean): Promise<void> {
        if (this.cacheUpdateInProgress) {
            return;
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
                console.error(`Failed to update cache for listing ID: ${listingDetails?.id}`, error);
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
