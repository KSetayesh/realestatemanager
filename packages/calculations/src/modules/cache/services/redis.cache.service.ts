import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import {
    AmortizationBreakdownResponseDTO,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO,
} from '@realestatemanager/types';
import { InvestmentMetricBuilder } from 'src/calculations/builder/investment.metric.builder';
import { InvestmentCalculator } from 'src/calculations/investment.calculator';
import applicationConfig from 'src/config/applicationConfig';
import { CacheInterface } from './cache.interface';

@Injectable()
export class RedisCacheService implements CacheInterface, OnModuleInit, OnModuleDestroy {
    private cacheUpdateQueue: string = 'cacheUpdateQueue';
    private redisClient: RedisClientType;
    private usePropertyCache: boolean = applicationConfig.useCache;
    private cacheUpdateInProgress: boolean = false;

    constructor() {
        console.log('CacheService instance created');
        console.log(`usePropertyCache: ${this.usePropertyCache}`);

        // Initialize Redis client with environment variable or default to localhost
        const redisUrl = applicationConfig.redisUrl || 'redis://127.0.0.1:6380';
        this.redisClient = createClient({
            url: redisUrl,
        });
    }

    async onModuleInit() {
        await this.redisClient.connect();
        console.log('Connected to Redis');
    }

    async onModuleDestroy() {
        await this.redisClient.disconnect();
        console.log('Disconnected from Redis');
    }

    async getCacheDetails(): Promise<any> {
        const keys = await this.redisClient.keys('*');
        const contentArr = await Promise.all(
            keys.map(async (key) => {
                const value = await this.redisClient.get(key);
                return {
                    key: parseInt(key, 10),
                    fullAddress: JSON.parse(value).listingDetails.propertyDetails.address.fullAddress,
                };
            })
        );
        const queueLength = await this.redisClient.lLen(this.cacheUpdateQueue);
        return {
            length: keys.length,
            content: contentArr,
            queueLength,
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
        const keys = await this.redisClient.keys('*');
        console.log(`Cache has been set with ${keys.length} properties.`);
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

    private async _resetCache(): Promise<void> {
        while (this.cacheUpdateInProgress) {
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
        await this.redisClient.sendCommand(['FLUSHDB']);
        await this.redisClient.del(this.cacheUpdateQueue);
        console.log(`Cache has been reset.`);
    }

    private async _deleteFromCache(listingDetailsId: number): Promise<void> {
        let wasDeleted = false;
        const key = listingDetailsId.toString();
        if (await this.redisClient.exists(key)) {
            await this.redisClient.del(key);
            wasDeleted = true;
            console.log(`Deleted key ${key} from cache.`);
        }
        const indexInQueue = (
            await this.redisClient.lRange(this.cacheUpdateQueue, 0, -1)
        ).findIndex((item) => JSON.parse(item).id === listingDetailsId);
        if (indexInQueue !== -1) {
            await this.redisClient.lRem(this.cacheUpdateQueue, 1, JSON.stringify({ id: listingDetailsId }));
            wasDeleted = true;
            console.log(`Deleted key ${listingDetailsId} from cache update queue.`);
        }
        if (!wasDeleted && this.cacheUpdateInProgress) {
            while (this.cacheUpdateInProgress) {
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            if (await this.redisClient.exists(key)) {
                await this.redisClient.del(key);
                wasDeleted = true;
                console.log(`Deleted key ${key} from cache after waiting.`);
            }
        }
        if (!wasDeleted) {
            console.log(`Key ${listingDetailsId} not found in cache or update queue.`);
        }
    }

    private async _setCache(listingDetailsList: ListingDetailsResponseDTO[], forceUpdate: boolean): Promise<void> {
        for (const listingDetails of listingDetailsList) {
            await this.redisClient.rPush(this.cacheUpdateQueue, JSON.stringify(listingDetails));
        }
        if (!this.cacheUpdateInProgress) {
            this.processCacheUpdateQueue(forceUpdate);
        }
    }

    private async processCacheUpdateQueue(forceUpdate: boolean): Promise<void> {
        if (this.cacheUpdateInProgress) {
            return;
        }
        this.cacheUpdateInProgress = true;
        while ((await this.redisClient.lLen('cacheUpdateQueue')) > 0) {
            const listingDetailsJson = await this.redisClient.lPop('cacheUpdateQueue');
            if (listingDetailsJson) {
                const listingDetails: ListingDetailsResponseDTO = JSON.parse(listingDetailsJson);
                try {
                    if (forceUpdate || !(await this.redisClient.exists(listingDetails.id.toString()))) {
                        const listingWithScenarios: ListingWithScenariosResponseDTO = this.createInvestmentMetrics(listingDetails);
                        await this.redisClient.set(listingDetails.id.toString(), JSON.stringify(listingWithScenarios));
                        console.log(`Cache updated for listing ID: ${listingDetails.id}`);
                    }
                } catch (error) {
                    console.error(`Failed to update cache for listing ID: ${listingDetails?.id}`, error);
                }
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
