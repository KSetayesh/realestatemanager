import { Body, Controller, Get, Post } from '@nestjs/common';
import { Address, HomeType, ListingInformationDTO } from '@realestatemanager/shared';
import { CalcService } from '../services/calc.service';

@Controller('calc')
export class CalcController {

    constructor(private readonly calcService: CalcService) { }


    @Get()
    async getAllProperties(): Promise<ListingInformationDTO[]> {
        return this.calcService.getAllProperties();
    }

    @Post('addProperty')
    async addNewProperty(
        @Body('listingInformation') listingInformation: ListingInformationDTO,
    ): Promise<void> {
        console.log("---listingInformation:", listingInformation);
        console.log("---listingInformationHOA:", listingInformation.listingPriceInformation.monthlyHOAFeesAmount);
        this.calcService.addNewProperty(listingInformation);

    }

}
