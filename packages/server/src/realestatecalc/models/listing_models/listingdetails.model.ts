import { ListingDetailsDTO } from "@realestatemanager/shared";
import { PropertyDetails } from "./propertydetails.model";
import { IDTOConvertible } from "../idtoconvertible.model";
import { ZillowMarketEstimates } from "./zillowmarketestimates.model";

export class ListingDetails implements IDTOConvertible<ListingDetailsDTO>{

    private zillowURL: string;
    private propertyDetails: PropertyDetails;
    private zillowMarketEstimates: ZillowMarketEstimates;
    private listingPrice: number;
    private dateListed: Date;
    private dateCreated: Date;
    private dateUpdated: Date;

    constructor(zillowURL: string,
        propertyDetails: PropertyDetails,
        zillowMarketEstimates: ZillowMarketEstimates,
        listingPrice: number,
        dateListed: Date,
        dateCreated: Date,
        dateUpdated: Date) {

        this.zillowURL = zillowURL;
        this.propertyDetails = propertyDetails;
        this.zillowMarketEstimates = zillowMarketEstimates;
        this.listingPrice = listingPrice;
        this.dateListed = dateListed;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
    }

    getListingPrice(): number {
        return this.listingPrice;
    }

    getZillowRentEstimate(): number {
        return this.zillowMarketEstimates.getZillowRentEstimate();
    }

    getZillowMonthlyPropertyTaxAmount(): number {
        return this.zillowMarketEstimates.getZillowMonthlyPropertyTaxAmount();
    }

    getZillowMonthlyHomeInsuranceAmount(): number {
        return this.zillowMarketEstimates.getZillowMonthlyHomeInsuranceAmount();
    }

    getZillowMonthlyHOAFeesAmount(): number {
        return this.zillowMarketEstimates.getZillowMonthlyHOAFeesAmount();
    }

    getNumberOfDaysOnMarket(): number {
        // Create a new date object for the current date with time set to 00:00:00
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Clone dateListed and set its time to 00:00:00
        const listedDate = new Date(this.dateListed.getTime());
        listedDate.setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds between the two dates
        const timeDiff = currentDate.getTime() - listedDate.getTime();

        // Convert the time difference to days
        const daysOnMarket = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

        return daysOnMarket;
    }

    toDTO(): ListingDetailsDTO {
        return {
            zillowURL: this.zillowURL,
            propertyDetails: this.propertyDetails.toDTO(),
            zillowMarketEstimates: this.zillowMarketEstimates.toDTO(),
            listingPrice: this.listingPrice,
            dateListed: this.dateListed.toLocaleDateString('en-US'),
            dateCreated: this.dateCreated.toLocaleDateString('en-US'),
            dateUpdated: this.dateUpdated.toLocaleDateString('en-US'),
            numberOfDaysOnMarket: this.getNumberOfDaysOnMarket(),
        };
    }

};