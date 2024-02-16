import { Injectable } from '@nestjs/common';
import { ListingDTO, ListingInformationDTO } from '@realestatemanager/shared';
import { RealEstateManager } from 'src/db/realestate/realestate.db';
import { RealEstateCalculator } from './realestatecalc.service';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;
    private realEstateCalc: RealEstateCalculator;

    constructor() {
        this.realEstateManager = new RealEstateManager();
        this.realEstateCalc = new RealEstateCalculator();
    }

    async getPropertyByZillowURL(zillowURL: string): Promise<ListingDTO> {
        const listingInformation: ListingInformationDTO = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        return {
            listingInformation: listingInformation,
            propertyCalculations: this.realEstateCalc.execute(listingInformation),
        };
    }

    async getAllProperties(): Promise<ListingDTO[]> {
        const listingInformationArr: ListingInformationDTO[] = await this.realEstateManager.getAllListings();
        const listings: ListingDTO[] = [];

        for (const listing of listingInformationArr) {
            listings.push({
                listingInformation: listing,
                propertyCalculations: this.realEstateCalc.execute(listing),
            });
        }

        return listings;
    }

    async addNewProperty(listingInformationDTO: ListingInformationDTO): Promise<void> {
        this.realEstateManager.insertListingInformation(listingInformationDTO);
    }


}
