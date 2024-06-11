import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { CacheService } from '../services/cache.service';
import { CreateInvestmentScenarioRequest, ListingDetailsResponseDTO, ListingWithScenariosResponseDTO } from '@realestatemanager/shared';
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
        await this.cacheService.setFreshCache(listingDetailsArr);
    }

    @Post('set')
    async setCache(
        @Body() listingDetails: ListingDetailsResponseDTO,
        @Body('forceUpdate') forceUpdate: boolean
    ): Promise<void> {
        await this.cacheService.setCache(listingDetails, forceUpdate);
    }

    @Post('reset')
    async resetCache(): Promise<void> {
        await this.cacheService.resetCache();
    }

    @Get('get')
    async getFromCache(
        @Body() listingDetails: ListingDetailsResponseDTO
    ): Promise<ListingWithScenariosResponseDTO> {
        return this.cacheService.getFromCache(listingDetails);
    }

    @Delete('delete/:id')
    async deleteCache(@Param('id') id: number): Promise<boolean> {
        return this.cacheService.deleteFromCache(id);
    }

    @Post('calculate')
    async calculate(
        @Body() listingDetails: ListingDetailsResponseDTO,
        @Body() investmentScenarioRequest: CreateInvestmentScenarioRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log(investmentScenarioRequest);
        return this.calcService.calculate(listingDetails, investmentScenarioRequest);
    }

}
