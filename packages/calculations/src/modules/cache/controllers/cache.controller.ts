import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { CacheService } from '../services/cache.service';
import {
    CreateListingDetailsCalculationsRequest,
    CreateSetCacheRequest,
    ListingDetailsResponseDTO,
    ListingWithScenariosResponseDTO
} from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';

@Controller('cache')
export class CacheController {
    constructor(
        private readonly cacheService: CacheService,
        private readonly calcService: CalcService
    ) { }

    @Post('setFreshCache')
    async setFreshCache(
        @Body() listingDetailsArr: ListingDetailsResponseDTO[],
    ): Promise<void> {
        console.log('hi_1');
        await this.cacheService.setFreshCache(listingDetailsArr);
    }

    @Post('set')
    async setCache(
        @Body() createSetCacheRequest: CreateSetCacheRequest,
    ): Promise<void> {
        console.log('hi_2');
        console.log('createSetCacheRequest:', createSetCacheRequest);
        await this.cacheService.setCache(createSetCacheRequest.listingDetails, createSetCacheRequest.forceUpdate);
    }

    @Post('reset')
    async resetCache(): Promise<void> {
        console.log('hi_3');
        await this.cacheService.resetCache();
    }

    @Post('get')
    async getFromCache(
        @Body() listingDetails: ListingDetailsResponseDTO[],
    ): Promise<ListingWithScenariosResponseDTO[]> {
        console.log('hi_4');
        console.log('listingDetails:', listingDetails);
        return this.cacheService.getFromCache(listingDetails);
    }

    @Delete('delete/:id')
    async deleteCache(@Param('id') id: number): Promise<boolean> {
        console.log('hi_5');
        return this.cacheService.deleteFromCache(id);
    }

    @Post('calculate')
    async calculate(
        @Body() createListingDetailsCalculationsRequest: CreateListingDetailsCalculationsRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log('hi_6');
        console.log(createListingDetailsCalculationsRequest);
        return this.calcService.calculate(
            createListingDetailsCalculationsRequest.listingDetails,
            createListingDetailsCalculationsRequest.investmentScenarioRequest
        );
    }

}
