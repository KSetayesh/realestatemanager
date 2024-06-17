import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import {
    CreateListingDetailsCalculationsRequest,
    CreateSetCacheRequest,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO
} from '@realestatemanager/types';
import { CalcService } from '../services/calc.service';
import { RedisCacheService } from '../services/redis.cache.service';

@Controller('cache')
export class CacheController {
    constructor(
        private readonly redisCacheService: RedisCacheService,
        private readonly calcService: CalcService
    ) { }

    @Post('checkCache')
    async checkCache(): Promise<any> {
        return this.redisCacheService.getCacheDetails();
    }

    @Post('setFreshCache')
    async setFreshCache(
        @Body() listingDetailsArr: ListingDetailsResponseDTO[],
    ): Promise<void> {
        console.log('hi_1');
        await this.redisCacheService.setFreshCache(listingDetailsArr);
    }

    @Post('set')
    async setCache(
        @Body() createSetCacheRequest: CreateSetCacheRequest,
    ): Promise<void> {
        console.log('hi_2');
        console.log('createSetCacheRequest:', createSetCacheRequest);
        await this.redisCacheService.setCache(createSetCacheRequest.listingDetailsList, createSetCacheRequest.forceUpdate);
    }

    @Post('reset')
    async resetCache(): Promise<void> {
        console.log('hi_3');
        await this.redisCacheService.resetCache();
    } 

    @Post('delete')
    async deleteCache(
        @Body() listingDetailIds: number[],
    ): Promise<void> {
        console.log('hi_5');
        await this.redisCacheService.deleteFromCache(listingDetailIds);
    }

    @Post('calculate')
    async calculate(
        @Body() createListingDetailsCalculationsRequest: CreateListingDetailsCalculationsRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log('hi_6');
        console.log(createListingDetailsCalculationsRequest);
        return this.calcService.calculate(createListingDetailsCalculationsRequest);
    }

    @Post('calculateinbulk')
    async calculateInBulk(
        @Body() createListingDetailsCalculationsListRequest: CreateListingDetailsCalculationsRequest[],
    ): Promise<ListingWithScenariosResponseDTO[]> {
        console.log('hi_6');
        console.log(createListingDetailsCalculationsListRequest);
        return this.calcService.calculateInBulk(createListingDetailsCalculationsListRequest);
    }


}
