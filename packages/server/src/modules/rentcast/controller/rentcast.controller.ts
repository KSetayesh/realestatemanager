import { Body, Controller, Get, Post } from '@nestjs/common';
import { RentCastService } from '../service/rentcast.service';
import { CreateRentCastApiRequest, RentCastDetailsResponseDTO } from '@realestatemanager/shared';

@Controller('rentcast')
export class RentCastController {

    constructor(private readonly rentCastService: RentCastService) { }

    @Get('rentCastApiCallDetails')
    async getRentCastApiCallDetails(
    ): Promise<RentCastDetailsResponseDTO[]> {
        return this.rentCastService.getRentCastApiDetailsDTO();
    }

    @Post('addNewPropertyWithRentCastAPI')
    async addNewPropertyWithRentCastAPI(
        @Body() rentCastApiRequest: CreateRentCastApiRequest,
    ): Promise<void> {
        await this.rentCastService.addNewPropertyWithRentCastAPI(rentCastApiRequest);
    }

}
