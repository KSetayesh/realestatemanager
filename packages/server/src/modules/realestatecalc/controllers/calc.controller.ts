import { Body, Controller, Post } from '@nestjs/common';
import {
    CreateListingDetailsRequest,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO,
    CreateGetAllPropertiesRequest,
    CreateUpdatePropertyRequest,
    CreatePropertiesInBulkRequest
} from '@realestatemanager/shared';
import { PropertyTransactionService } from '../services/property.transaction.service';

@Controller('realestatecalc')
export class CalcController {

    constructor(private readonly propertyTxnService: PropertyTransactionService) { }

    // Had to change this from a GET to a POST
    @Post()
    async getAllProperties(
        @Body() getAllPropertiesRequest?: CreateGetAllPropertiesRequest,
    ): Promise<ListingWithScenariosResponseDTO[]> {
        return this.propertyTxnService.getAllProperties(getAllPropertiesRequest);
    }

    @Post('updateProperty')
    async updateProperty(
        @Body() createUpdatePropertyRequest: CreateUpdatePropertyRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log('createUpdatePropertyRequest:', createUpdatePropertyRequest);
        return this.propertyTxnService.updateProperty(createUpdatePropertyRequest);
    }

    @Post('deleteListingDetails')
    async deleteListingDetails(
        @Body('zillowURL') zillowURL: string
    ): Promise<boolean> {
        return this.propertyTxnService.deleteListingDetails(zillowURL);
    }

    @Post('addNewProperty')
    async addNewProperty(
        @Body() listingDetails: CreateListingDetailsRequest,
    ): Promise<void> {
        console.log('New listing:', listingDetails);
        await this.propertyTxnService.addNewProperty(listingDetails);
    }

    @Post('addPropertiesInBulk')
    async addPropertiesInBulk(
        @Body() propertiesInBulk: CreatePropertiesInBulkRequest,
    ): Promise<number> {
        return this.propertyTxnService.addPropertiesInBulk(propertiesInBulk);
    }

    @Post('calculate')
    async calculate(
        @Body() investmentScenarioRequest: CreateInvestmentScenarioRequest,
    ): Promise<ListingWithScenariosResponseDTO> {
        console.log('hi_7');
        console.log(investmentScenarioRequest);
        return this.propertyTxnService.calculate(investmentScenarioRequest);
    }

}
