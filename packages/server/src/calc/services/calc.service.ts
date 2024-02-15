import { Injectable } from '@nestjs/common';
import { ListingInformationDTO } from '@realestatemanager/shared';
import { RealEstateManager } from 'src/db/realestate/realestate.db';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;

    constructor() {
        this.realEstateManager = new RealEstateManager();
    }

    async getPropertyByZillowURL(zillowURL: string): Promise<ListingInformationDTO> {
        return this.realEstateManager.getPropertyByZillowURL(zillowURL);
    }

    async getAllProperties(): Promise<ListingInformationDTO[]> {
        return this.realEstateManager.getAllListings();
    }

    async addNewProperty(listingInformationDTO: ListingInformationDTO): Promise<void> {
        this.realEstateManager.insertListingInformation(listingInformationDTO);
    }


}
