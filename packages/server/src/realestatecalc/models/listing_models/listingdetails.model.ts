import { ListingDetailsDTO, PropertyStatus, ListingCreationType, Utility } from "@realestatemanager/shared";
import { PropertyDetails } from "./propertydetails.model";
import { IDTOConvertible } from "../idtoconvertible.model";
import { ZillowMarketEstimates } from "./zillowmarketestimates.model";

export class ListingDetails implements IDTOConvertible<ListingDetailsDTO>{

    private _zillowURL: string;
    private _propertyDetails: PropertyDetails;
    private _zillowMarketEstimates: ZillowMarketEstimates;
    private _listingPrice: number;
    private _propertyStatus: PropertyStatus;
    private _creationType: ListingCreationType;
    private _dateListed: Date;
    private _dateCreated: Date;
    private _dateUpdated: Date;
    private _rentCastSaleResponseId?: number;
    private _rentCastPropertyResponseId?: number;

    constructor(zillowURL: string,
        propertyDetails: PropertyDetails,
        zillowMarketEstimates: ZillowMarketEstimates,
        listingPrice: number,
        propertyStatus: PropertyStatus,
        creationType: ListingCreationType,
        dateListed: Date,
        dateCreated: Date,
        dateUpdated: Date,
        rentCastSaleResponseId?: number,
        rentCastPropertyResponseId?: number,
    ) {

        this._zillowURL = zillowURL;
        this._propertyDetails = propertyDetails;
        this._zillowMarketEstimates = zillowMarketEstimates;
        this._listingPrice = listingPrice;
        this._propertyStatus = propertyStatus;
        this._creationType = creationType;
        this._dateListed = dateListed;
        this._dateCreated = dateCreated;
        this._dateUpdated = dateUpdated;
        this._rentCastSaleResponseId = rentCastSaleResponseId;
        this._rentCastPropertyResponseId = rentCastPropertyResponseId;
    }

    get zillowURL(): string {
        return this._zillowURL;
    }

    get listingPrice(): number {
        return this._listingPrice;
    }

    get zillowRentEstimate(): number {
        return this._zillowMarketEstimates.getZillowRentEstimate();
    }

    get zillowMonthlyPropertyTaxAmount(): number {
        return this._zillowMarketEstimates.getZillowMonthlyPropertyTaxAmount();
    }

    get zillowMonthlyHomeInsuranceAmount(): number {
        return this._zillowMarketEstimates.getZillowMonthlyHomeInsuranceAmount();
    }

    get zillowMonthlyHOAFeesAmount(): number {
        return this._zillowMarketEstimates.getZillowMonthlyHOAFeesAmount();
    }

    get propertyStatus(): PropertyStatus {
        return this._propertyStatus;
    }

    get creationType(): ListingCreationType {
        return this._creationType;
    }

    get dateListed(): Date {
        return this._dateListed;
    }

    get rentCastSaleResponseId(): number {
        return this._rentCastSaleResponseId;
    }

    get rentCastPropertyResponseId(): number {
        return this._rentCastPropertyResponseId;
    }

    toDTO(): ListingDetailsDTO {
        return {
            zillowURL: this.zillowURL,
            propertyDetails: this._propertyDetails.toDTO(),
            zillowMarketEstimates: this._zillowMarketEstimates.toDTO(),
            listingPrice: this.listingPrice,
            propertyStatus: this.propertyStatus,
            dateListed: this.dateListed.toLocaleDateString('en-US'),
            dateCreated: this._dateCreated.toLocaleDateString('en-US'),
            dateUpdated: this._dateUpdated.toLocaleDateString('en-US'),
            numberOfDaysOnMarket: Utility.getNumberOfDaysSince(this.dateListed),
            creationType: this.creationType,
        };
    }

};