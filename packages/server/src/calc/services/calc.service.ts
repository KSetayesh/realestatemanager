import { Injectable } from '@nestjs/common';
import { RealEstateManager } from 'src/db/realestate/realestate.db';
import { RealEstateCalculator } from './realestatecalc.service';
import { ListingDetailsDTO } from '@realestatemanager/shared';

@Injectable()
export class CalcService {

    private realEstateManager: RealEstateManager;
    private realEstateCalc: RealEstateCalculator;

    constructor() {
        this.realEstateManager = new RealEstateManager();
        this.realEstateCalc = new RealEstateCalculator();
    }

    // async getPropertyByZillowURL(zillowURL: string): Promise<InvestmentAnalysisDTO> {
    //     // const listingDetails: ListingDetails = await this.realEstateManager.getPropertyByZillowURL(zillowURL);
    //     // const investmentAnalysis: InvestmentAnalysis = this.realEstateCalc.execute(listingDetails);
    //     // const propertyListing: PropertyListing = new PropertyListing(listingDetails, investmentAnalysis);
    //     // return propertyListing.toDTO();
    //     return null;
    // }

    // async getAllProperties(): Promise<InvestmentAnalysisDTO[]> {
    //     // const listingDetailsArr: ListingDetails[] = await this.realEstateManager.getAllListings();
    //     // const investmentAnalysisArr: InvestmentAnalysisDTO[] = [];
    //     // for (const listingDetails of listingDetailsArr) {
    //     //     const investmentAnalysis: InvestmentAnalysis = new InvestmentAnalysis(listingDetails, null, null, null, null, 0, 0);
    //     //     investmentAnalysisArr.push(investmentAnalysis);
    //     // }

    //     // // const propertyListingsDTO: PropertyListingDTO[] = [];
    //     // // for (const listingDetails of listingDetailsArr) {
    //     // //     const investmentAnalysis: InvestmentAnalysis = this.realEstateCalc.execute(listingDetails);
    //     // //     propertyListingsDTO.push(new PropertyListing(listingDetails, investmentAnalysis).toDTO());
    //     // // }

    //     // return propertyListingsDTO;
    //     return null;
    // }

    async addNewProperty(listingDetailsDTO: ListingDetailsDTO): Promise<void> {
        this.realEstateManager.insertListingInformation(listingDetailsDTO);
    }


}
