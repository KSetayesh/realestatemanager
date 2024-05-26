import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
    CreateRentCastApiRequest,
    RentCastDetailsResponseDTO,
    CreateListingDetailsRequest,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO,
    CreateGetAllPropertiesRequest
} from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';
import { RentCastService } from '../services/rentcast.service';

@Controller('realestatecalc')
export class CalcController {

    constructor(private readonly calcService: CalcService, private readonly rentCastService: RentCastService) { }

    @Get()
    async getAllProperties(
        @Query() getAllPropertiesRequest?: CreateGetAllPropertiesRequest,
    ): Promise<ListingWithScenariosResponseDTO[]> {
        console.log('In getAllProperties endpoint');
        const investmentScenarioRequest: CreateInvestmentScenarioRequest = getAllPropertiesRequest?.investmentScenarioRequest;

        if (getAllPropertiesRequest) {
            console.log('---filteredPropertyListRequest:', getAllPropertiesRequest.filteredPropertyListRequest);
        }
        else {
            console.log('---getAllPropertiesRequest is undefined');
        }

        if (!this.isValidInvestmentScenarioRequest(investmentScenarioRequest)) {
            throw new Error('Not a valid Investment Scenario Request');
        }
        return this.calcService.getAllProperties(investmentScenarioRequest);
    }

    @Get('property')
    async getPropertyByZillowUrl(
        @Query('zillowURL') zillowURL: string,
        @Query('investmentScenarioRequest') investmentScenarioRequest?: CreateInvestmentScenarioRequest
    ): Promise<ListingWithScenariosResponseDTO> {

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
    ): Promise<RentCastDetailsResponseDTO[]> {
        return this.rentCastService.getRentCastApiDetailsDTO();
    }

    @Post('addNewProperty')
    async addNewProperty(
        @Body() listingDetails: CreateListingDetailsRequest,
    ): Promise<void> {
        await this.calcService.addNewProperty(listingDetails);
    }

    @Post('addNewPropertyWithRentCastAPI')
    async addNewPropertyWithRentCastAPI(
        @Body() rentCastApiRequest: CreateRentCastApiRequest,
    ): Promise<void> {
        await this.rentCastService.addNewPropertyWithRentCastAPI(rentCastApiRequest);
    }

    @Post('calculate')
    async calculate(
        @Body() investmentScenarioRequest: CreateInvestmentScenarioRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log(investmentScenarioRequest);
        return this.calcService.calculate(investmentScenarioRequest);
    }

    private isValidInvestmentScenarioRequest(investmentScenarioRequest?: CreateInvestmentScenarioRequest): boolean {
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
