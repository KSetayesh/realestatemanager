import { ListingDetailsDTO } from "@realestatemanager/shared";
import { PropertyDetails } from "./propertydetails.model";
import { IDTOConvertible } from "./idtoconvertible.model";
import { ZillowMarketEstimates } from "./zillowmarketestimates.model";

export class ListingDetails implements IDTOConvertible<ListingDetailsDTO>{
    private zillowURL: string;
    private propertyDetails: PropertyDetails;
    private listingPrice: number;
    private zillowMarketEstimates: ZillowMarketEstimates;
    // private priceDetails: PriceDetails;

    constructor(zillowURL: string,
        propertyDetails: PropertyDetails,
        listingPrice: number,
        zillowMarketEstimates: ZillowMarketEstimates) {
        this.zillowURL = zillowURL;
        this.propertyDetails = propertyDetails;
        this.listingPrice = listingPrice;
        this.zillowMarketEstimates = zillowMarketEstimates;
        // this.priceDetails = priceDetails;
    }

    getListingPrice(): number {
        return this.listingPrice;
    }

    toDTO(): ListingDetailsDTO {
        return {
            zillowURL: this.zillowURL,
            propertyDetails: this.propertyDetails.toDTO(),
            listingPrice: this.listingPrice,
            zillowMarketEstimates: this.zillowMarketEstimates.toDTO(),
        }
    }

};