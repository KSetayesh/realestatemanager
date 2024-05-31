import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
    CreateRentCastApiRequest,
    RentCastDetailsResponseDTO,
    CreateListingDetailsRequest,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO,
    CreateGetAllPropertiesRequest,
    CreateUpdatePropertyRequest
} from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';
import { RentCastService } from '../services/rentcast.service';

@Controller('realestatecalc')
export class CalcController {

    constructor(private readonly calcService: CalcService, private readonly rentCastService: RentCastService) { }

    // Had to change this from a GET to a POST
    @Post()
    async getAllProperties(
        @Body() getAllPropertiesRequest?: CreateGetAllPropertiesRequest,
    ): Promise<ListingWithScenariosResponseDTO[]> {

        console.log('In getAllProperties endpoint');

        if (getAllPropertiesRequest) {
            console.log('---filteredPropertyListRequest:', getAllPropertiesRequest.filteredPropertyListRequest);
        }
        else {
            console.log('---getAllPropertiesRequest is undefined');
        }

        return this.calcService.getAllProperties(getAllPropertiesRequest);

    }

    @Post('updateProperty')
    async updateProperty(
        @Body() createUpdatePropertyRequest: CreateUpdatePropertyRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log('createUpdatePropertyRequest:', createUpdatePropertyRequest);
        return this.calcService.updateProperty(createUpdatePropertyRequest);
    }

    @Get('property')
    async getPropertyByZillowUrl(
        @Query('zillowURL') zillowURL: string,
        @Query('investmentScenarioRequest') investmentScenarioRequest?: CreateInvestmentScenarioRequest
    ): Promise<ListingWithScenariosResponseDTO> {

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
        console.log('New listing:', listingDetails);
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

    // private isValidInvestmentScenarioRequest(investmentScenarioRequest?: CreateInvestmentScenarioRequest): boolean {
    //     if (investmentScenarioRequest) {
    //         if (investmentScenarioRequest.useDefaultRequest) {
    //             return true;
    //         }
    //         else if (!investmentScenarioRequest.investmentDetails) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

}
