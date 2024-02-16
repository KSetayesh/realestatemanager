import { Injectable } from '@nestjs/common';
import { RealEstateManager } from 'src/db/realestate/realestate.db';
import { RealEstateCalculator } from './realestatecalc.service';
import { ListingDetails } from '../models/listingdetails.model';
import { ListingDetailsDTO, PropertyListingDTO } from '@realestatemanager/shared';
import { InvestmentAnalysis } from '../models/investmentanalysis.model';
import { PropertyListing } from '../models/propertylisting.model';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;
    private realEstateCalc: RealEstateCalculator;

    constructor() {
        this.realEstateManager = new RealEstateManager();
        this.realEstateCalc = new RealEstateCalculator();
    }

    async getPropertyByZillowURL(zillowURL: string): Promise<PropertyListingDTO> {
        const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
        const investmentAnalysis: InvestmentAnalysis = this.realEstateCalc.execute(listingDetails);
        const propertyListing: PropertyListing = new PropertyListing(listingDetails, investmentAnalysis);
        return propertyListing.toDTO();
    }

    async getAllProperties(): Promise<PropertyListingDTO[]> {
        const listingDetailsArr: ListingDetails[] = await this.realEstateManager.getAllListings();
        const propertyListingsDTO: PropertyListingDTO[] = [];
        for (const listingDetails of listingDetailsArr) {
            const investmentAnalysis: InvestmentAnalysis = this.realEstateCalc.execute(listingDetails);
            propertyListingsDTO.push(new PropertyListing(listingDetails, investmentAnalysis).toDTO());
        }

        return propertyListingsDTO;
    }

    async addNewProperty(listingDetailsDTO: ListingDetailsDTO): Promise<void> {
        this.realEstateManager.insertListingInformation(listingDetailsDTO);
    }


}
