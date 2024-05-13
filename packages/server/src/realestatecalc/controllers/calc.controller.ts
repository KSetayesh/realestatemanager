import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InvestmentScenarioRequest, ListingCreationType, ListingDetailsDTO, ListingWithScenariosDTO, RentCastApiRequestDTO, RentCastDetailsDTO } from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';
import { RentCastService } from '../services/rentcast.service';

@Controller('realestatecalc')
export class CalcController {

    constructor(private readonly calcService: CalcService, private readonly rentCastService: RentCastService) { }

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

    @Get('rentCastApiCallDetails')
    async getRentCastApiCallDetails(
    ): Promise<RentCastDetailsDTO[]> {
        return this.rentCastService.getRentCastApiDetailsDTO();
    }

    @Post('addNewProperty')
    async addNewProperty(
        @Body() listingDetails: ListingDetailsDTO,
    ): Promise<void> {
        await this.calcService.addNewProperty(listingDetails);
    }

    @Post('addNewPropertyWithRentCastAPI')
    async addNewPropertyWithRentCastAPI(
        @Body() rentCastApiRequest: RentCastApiRequestDTO,
    ): Promise<void> {
        await this.rentCastService.addNewPropertyWithRentCastAPI(rentCastApiRequest);
    }

    @Post('calculate')
    async calculate(
        @Body() investmentScenarioRequest: InvestmentScenarioRequest,
    ): Promise<ListingWithScenariosDTO> {
        console.log(investmentScenarioRequest);
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
