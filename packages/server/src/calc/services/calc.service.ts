import { Injectable } from '@nestjs/common';
import { InvestmentPropertyDTO, ListingInformationDTO } from '@realestatemanager/shared';
import { RealEstateManager } from 'src/db/realestate/realestate.db';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;

    constructor() {
        this.realEstateManager = new RealEstateManager();
    }

    async addNewProperty(listingInformationDTO: ListingInformationDTO): Promise<void> {
        this.realEstateManager.insertListingInformation(listingInformationDTO);
    }

    async getAllProperties(): Promise<ListingInformationDTO[]> {
        return [];
    }

    async getInvestmentPropertyInformation(zillowURL: string): Promise<InvestmentPropertyDTO> {
        // ...Fetch home data from database...
        return;
    }

}
