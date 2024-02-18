import { ListingDetailsDTO } from "@realestatemanager/shared";
import { PriceDetails } from "./pricedetails.model";
import { PropertyDetails } from "./propertydetails.model";
import { IDTOConvertible } from "./idtoconvertible.model";

export class ListingDetails implements IDTOConvertible<ListingDetailsDTO>{
    zillowURL: string;
    propertyDetails: PropertyDetails;
    priceDetails: PriceDetails;

    constructor(zillowURL: string, propertyDetails: PropertyDetails, priceDetails: PriceDetails) {
        this.zillowURL = zillowURL;
        this.propertyDetails = propertyDetails;
        this.priceDetails = priceDetails;
    }

    toDTO(): ListingDetailsDTO {
        return {
            zillowURL: this.zillowURL,
            propertyDetails: this.propertyDetails.toDTO(),
            priceDetails: this.priceDetails.toDTO(),
        }
    }

};