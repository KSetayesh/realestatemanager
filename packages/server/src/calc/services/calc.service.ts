import { Injectable } from '@nestjs/common';
import { RealEstateManager } from 'src/db/realestate/realestate.db';
import { ListingDetailsDTO, ListingWithScenariosDTO } from '@realestatemanager/shared';
import { ListingWithScenarios } from '../models/listingwithscenarios.model';
import { ListingDetails } from '../models/listingdetails.model';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;

    constructor() {
        this.realEstateManager = new RealEstateManager();
    }

    async getAllProperties(): Promise<ListingWithScenariosDTO[]> {
        const listingWithScenariosArr: ListingWithScenariosDTO[] = [];
        const listingDetailsArr: ListingDetails[] = await this.realEstateManager.getAllListings();
        for (const listingDetails of listingDetailsArr) {
            const listingWithScenarios: ListingWithScenarios = new ListingWithScenarios(listingDetails);
            listingWithScenariosArr.push(listingWithScenarios.toDTO());
        }
        return listingWithScenariosArr;
    }

    async getPropertyByZillowURL(zillowURL: string): Promise<ListingWithScenariosDTO> {
        const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        const listingWithScenarios: ListingWithScenarios = new ListingWithScenarios(listingDetails);
        return listingWithScenarios.toDTO();
    }

    async addNewProperty(listingDetailsDTO: ListingDetailsDTO): Promise<void> {
        this.realEstateManager.insertListingDetails(listingDetailsDTO);
    }


}
