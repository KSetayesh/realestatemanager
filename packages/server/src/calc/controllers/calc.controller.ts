import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PropertyListingDTO, ListingDetailsDTO } from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';

@Controller('calc')
export class CalcController {

    constructor(private readonly calcService: CalcService) { }

    @Get()
    async getAllProperties(): Promise<PropertyListingDTO[]> {
        return this.calcService.getAllProperties();
    }

    @Get('property')
    async getPropertyByZillowUrl(@Query('zillowURL') zillowURL: string): Promise<PropertyListingDTO> {
        if (!zillowURL) {
            throw new Error('zillowURL query parameter is required');
        }
        return this.calcService.getPropertyByZillowURL(zillowURL);
    }

    @Post('addProperty')
    async addNewProperty(
        @Body('listingDetails') listingDetails: ListingDetailsDTO,
    ): Promise<void> {
        this.calcService.addNewProperty(listingDetails);
    }

}
