import { ListingDetailsDTO } from "@realestatemanager/shared";
import { PriceDetails } from "./pricedetails.model";
import { PropertyDetails } from "./propertydetails.model";

export class ListingDetails {
    zillowURL: string;
    propertyDetails: PropertyDetails;
    priceDetails: PriceDetails;

    constructor() { }

    toDTO(): ListingDetailsDTO {
        return {
            zillowURL: this.zillowURL,
            propertyDetails: this.propertyDetails.toDTO(),
            priceDetails: this.priceDetails.toDTO(),
        }
    }

};