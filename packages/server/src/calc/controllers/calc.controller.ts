import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InvestmentScenarioRequestDTO, ListingDetailsDTO, ListingWithScenariosDTO } from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';

@Controller('calc')
export class CalcController {

    constructor(private readonly calcService: CalcService) { }

    @Get()
    async getAllProperties(
        @Query('investmentScenarioRequest') investmentScenarioRequest?: InvestmentScenarioRequestDTO
    ): Promise<ListingWithScenariosDTO[]> {

        if (!this.isValidInvestmentScenarioRequest(investmentScenarioRequest)) {
            throw new Error('Not a valid Investment Scenario Request');
        }
        return this.calcService.getAllProperties(investmentScenarioRequest);
    }

    @Get('property')
    async getPropertyByZillowUrl(
        @Query('zillowURL') zillowURL: string,
        @Query('investmentScenarioRequest') investmentScenarioRequest?: InvestmentScenarioRequestDTO
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

    private isValidInvestmentScenarioRequest(investmentScenarioRequest?: InvestmentScenarioRequestDTO): boolean {
        if (investmentScenarioRequest) {
            if (investmentScenarioRequest.useDefaultRequest && investmentScenarioRequest.investmentScenario) {
                return false;
            }
            if (!investmentScenarioRequest.useDefaultRequest && !investmentScenarioRequest.investmentScenario) {
                return false;
            }
        }
        return true;
    }

}
