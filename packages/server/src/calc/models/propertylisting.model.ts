import { PropertyListingDTO } from "@realestatemanager/shared";
import { InvestmentAnalysis } from "./investmentanalysis.model";
import { ListingDetails } from "./listingdetails.model";

export class PropertyListing {
    private listingDetails: ListingDetails;
    private investmentAnalysis: InvestmentAnalysis;

    constructor(listingDetails: ListingDetails, investmentsAnalysis: InvestmentAnalysis) {
        this.listingDetails = listingDetails;
        this.investmentAnalysis = investmentsAnalysis;
    }

    // TODO:  Uncomment "this.investmentAnalysis.toDTO()" once finished with code
    toDTO(): PropertyListingDTO {
        return {
            listingDetails: this.listingDetails.toDTO(),
            investmentAnalysis: null, // this.investmentAnalysis.toDTO(),
        };
    }
}
