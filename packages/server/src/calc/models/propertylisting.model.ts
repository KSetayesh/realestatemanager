import { PropertyListingDTO } from "@realestatemanager/shared";
import { InvestmentAnalysis } from "./investmentanalysis.model";
import { ListingDetails } from "./listingdetails.model";
import { IDTOConvertible } from "./idtoconvertible.model";

export class PropertyListing implements IDTOConvertible<PropertyListingDTO> {
    private listingDetails: ListingDetails;
    private investmentAnalysis: InvestmentAnalysis;

    constructor(listingDetails: ListingDetails, investmentsAnalysis: InvestmentAnalysis) {
        this.listingDetails = listingDetails;
        this.investmentAnalysis = investmentsAnalysis;
    }

    toDTO(): PropertyListingDTO {
        return {
            listingDetails: this.listingDetails.toDTO(),
            investmentAnalysis: this.investmentAnalysis.toDTO(),
        };
    }
}
