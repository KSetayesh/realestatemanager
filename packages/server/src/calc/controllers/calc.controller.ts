import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InvestmentScenarioRequest, ListingDetailsDTO, ListingWithScenariosDTO } from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';

@Controller('calc')
export class CalcController {

    constructor(private readonly calcService: CalcService) { }

    @Get()
    async getAllProperties(
        @Query('investmentScenarioRequest') investmentScenarioRequest?: InvestmentScenarioRequest
    ): Promise<ListingWithScenariosDTO[]> {

        if (!this.isValidInvestmentScenarioRequest(investmentScenarioRequest)) {
            throw new Error('Not a valid Investment Scenario Request');
        }
        return this.calcService.getAllProperties(investmentScenarioRequest);
    }

    @Get('property')
    async getPropertyByZillowUrl(
        @Query('zillowURL') zillowURL: string,
        @Query('investmentScenarioRequest') investmentScenarioRequest?: InvestmentScenarioRequest
    ): Promise<ListingWithScenariosDTO> {

        if (!zillowURL) {
            throw new Error('zillowURL query parameter is required');
        }
        if (!this.isValidInvestmentScenarioRequest(investmentScenarioRequest)) {
            throw new Error('Not a valid Investment Scenario Request');
        }
        return this.calcService.getPropertyByZillowURL(zillowURL, investmentScenarioRequest);
    }

    @Post('addNewProperty')
    async addNewProperty(
        @Body() listingDetails: ListingDetailsDTO,
    ): Promise<void> {
        this.calcService.addNewProperty(listingDetails);
    }

    @Post('calculate')
    async calculate(
        @Body() investmentScenarioRequest: InvestmentScenarioRequest,
    ): Promise<ListingWithScenariosDTO> {
        return this.calcService.calculate(investmentScenarioRequest);
    }

    private isValidInvestmentScenarioRequest(investmentScenarioRequest?: InvestmentScenarioRequest): boolean {
        if (investmentScenarioRequest) {
            if (investmentScenarioRequest.useDefaultRequest) {
                return true;
            }
            else if (!investmentScenarioRequest.investmentDetails) {
                return false;
            }
        }
        return true;
    }

}
