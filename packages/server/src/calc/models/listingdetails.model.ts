import { ListingDetailsDTO } from "@realestatemanager/shared";
import { PropertyDetails } from "./propertydetails.model";
import { IDTOConvertible } from "./idtoconvertible.model";
import { ZillowMarketEstimates } from "./zillowmarketestimates.model";

export class ListingDetails implements IDTOConvertible<ListingDetailsDTO>{
    private zillowURL: string;
    private propertyDetails: PropertyDetails;
    private zillowMarketEstimates: ZillowMarketEstimates;
    private listingPrice: number;
    // private priceDetails: PriceDetails;

    constructor(zillowURL: string,
        propertyDetails: PropertyDetails,
        zillowMarketEstimates: ZillowMarketEstimates,
        listingPrice: number) {
        this.zillowURL = zillowURL;
        this.propertyDetails = propertyDetails;
        this.zillowMarketEstimates = zillowMarketEstimates;
        this.listingPrice = listingPrice;
        // this.priceDetails = priceDetails;
    }

    getListingPrice(): number {
        return this.listingPrice;
    }

    toDTO(): ListingDetailsDTO {
        return {
            zillowURL: this.zillowURL,
            propertyDetails: this.propertyDetails.toDTO(),
            zillowMarketEstimates: this.zillowMarketEstimates.toDTO(),
            listingPrice: this.listingPrice,
        }
    }

};