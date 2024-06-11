import { Body, Controller, Post } from '@nestjs/common';
import {
    CreateListingDetailsRequest,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO,
    CreateGetAllPropertiesRequest,
    CreateUpdatePropertyRequest,
    CreatePropertiesInBulkRequest
} from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';

@Controller('realestatecalc')
export class CalcController {

    constructor(private readonly calcService: CalcService) { }

    // Had to change this from a GET to a POST
    @Post()
    async getAllProperties(
        @Body() getAllPropertiesRequest?: CreateGetAllPropertiesRequest,
    ): Promise<ListingWithScenariosResponseDTO[]> {
        return this.calcService.getAllProperties(getAllPropertiesRequest);
    }

    @Post('updateProperty')
    async updateProperty(
        @Body() createUpdatePropertyRequest: CreateUpdatePropertyRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log('createUpdatePropertyRequest:', createUpdatePropertyRequest);
        return this.calcService.updateProperty(createUpdatePropertyRequest);
    }

    @Post('deleteListingDetails')
    async deleteListingDetails(
        @Body('zillowURL') zillowURL: string
    ): Promise<boolean> {
        return this.calcService.deleteListingDetails(zillowURL);
    }

    @Post('addNewProperty')
    async addNewProperty(
        @Body() listingDetails: CreateListingDetailsRequest,
    ): Promise<void> {
        console.log('New listing:', listingDetails);
        await this.calcService.addNewProperty(listingDetails);
    }

    @Post('addPropertiesInBulk')
    async addPropertiesInBulk(
        @Body() propertiesInBulk: CreatePropertiesInBulkRequest,
    ): Promise<number> {
        return this.calcService.addPropertiesInBulk(propertiesInBulk);
    }

    @Post('calculate')
    async calculate(
        @Body() investmentScenarioRequest: CreateInvestmentScenarioRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log(investmentScenarioRequest);
        return this.calcService.calculate(investmentScenarioRequest);
    }

}
