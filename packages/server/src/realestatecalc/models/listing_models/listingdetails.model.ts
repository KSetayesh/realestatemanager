import {
    PropertyStatus,
    ListingCreationType,
    Utility,
    State,
    Country,
    PropertyType,
    ListingDetailsResponseDTO
} from "@realestatemanager/shared";
import { PropertyDetails } from "./propertydetails.model";
import { IDTOConvertible } from "../idtoconvertible.model";
import { ZillowMarketEstimates } from "./zillowmarketestimates.model";
import { Entity } from "src/shared/entity";

export class ListingDetails extends Entity implements IDTOConvertible<ListingDetailsResponseDTO>{

    private _zillowURL: string;
    private _propertyDetails: PropertyDetails;
    private _zillowMarketEstimates: ZillowMarketEstimates;
    private _listingPrice: number;
    private _propertyStatus: PropertyStatus;
    private _creationType: ListingCreationType;
    private _dateListed: Date;
    private _rentCastSaleResponseId?: number;
    private _rentCastPropertyResponseId?: number;

    constructor(
        id: number,
        zillowURL: string,
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
        super(id, dateCreated, dateUpdated);
        this._zillowURL = zillowURL;
        this._propertyDetails = propertyDetails;
        this._zillowMarketEstimates = zillowMarketEstimates;
        this._listingPrice = listingPrice;
        this._propertyStatus = propertyStatus;
        this._creationType = creationType;
        this._dateListed = dateListed;
        this._rentCastSaleResponseId = rentCastSaleResponseId;
        this._rentCastPropertyResponseId = rentCastPropertyResponseId;
    }

    get zillowURL(): string {
        return this._zillowURL;
    }

    get fullAddress(): string {
        return this._propertyDetails.fullAddress;
    }

    get state(): State {
        return this._propertyDetails.state;
    }

    get zipcode(): string {
        return this._propertyDetails.zipcode;
    }

    get city(): string {
        return this._propertyDetails.city;
    }

    get county(): string {
        return this._propertyDetails.county;
    }

    get country(): Country {
        return this._propertyDetails.country;
    }

    get streetAddress(): string {
        return this._propertyDetails.streetAddress;
    }

    get apartmentNumber(): string {
        return this._propertyDetails.apartmentNumber;
    }

    get longitude(): number {
        return this._propertyDetails.longitude;
    }

    get latitude(): number {
        return this._propertyDetails.latitude;
    }

    get elementarySchoolRating(): number {
        return this._propertyDetails.elementarySchoolRating;
    }

    get middleSchoolRating(): number {
        return this._propertyDetails.middleSchoolRating;
    }

    get highSchoolRating(): number {
        return this._propertyDetails.highSchoolRating;
    }

    get numberOfBedrooms(): number {
        return this._propertyDetails.numberOfBedrooms;
    }

    get numberOfFullBathrooms(): number {
        return this._propertyDetails.numberOfFullBathrooms;
    }

    get numberOfHalfBathrooms(): number {
        return this._propertyDetails.numberOfHalfBathrooms;
    }

    get squareFeet(): number {
        return this._propertyDetails.squareFeet;
    }

    get acres(): number {
        return this._propertyDetails.acres;
    }

    get yearBuilt(): number {
        return this._propertyDetails.yearBuilt;
    }

    get hasGarage(): boolean {
        return this._propertyDetails.hasGarage;
    }

    get hasPool(): boolean {
        return this._propertyDetails.hasPool;
    }

    get hasBasement(): boolean {
        return this._propertyDetails.hasBasement;
    }

    get propertyType(): PropertyType {
        return this._propertyDetails.propertyType;
    }

    get description(): string {
        return this._propertyDetails.description;
    }

    get zestimate(): number {
        return this._zillowMarketEstimates.zestimate;
    }

    get zestimateRangeLow(): number {
        return this._zillowMarketEstimates.zestimateRangeLow;
    }

    get zestimateRangeHigh(): number {
        return this._zillowMarketEstimates.zestimateRangeHigh;
    }

    get zillowRentEstimate(): number {
        return this._zillowMarketEstimates.zillowRentEstimate;
    }

    get zillowMonthlyPropertyTaxAmount(): number {
        return this._zillowMarketEstimates.zillowMonthlyPropertyTaxAmount;
    }

    get zillowMonthlyHomeInsuranceAmount(): number {
        return this._zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount;
    }

    get zillowMonthlyHOAFeesAmount(): number {
        return this._zillowMarketEstimates.zillowMonthlyHOAFeesAmount;
    }

    get listingPrice(): number {
        return this._listingPrice;
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

    toDTO(): ListingDetailsResponseDTO {
        return {
            zillowURL: this.zillowURL,
            propertyDetails: this._propertyDetails.toDTO(),
            zillowMarketEstimates: this._zillowMarketEstimates.toDTO(),
            listingPrice: this.listingPrice,
            propertyStatus: this.propertyStatus,
            dateListed: this.dateListed.toLocaleDateString('en-US'),
            dateCreated: this.dateCreated.toLocaleDateString('en-US'),
            dateUpdated: this.dateUpdated.toLocaleDateString('en-US'),
            numberOfDaysOnMarket: Utility.getNumberOfDaysSince(this.dateListed),
            creationType: this.creationType,
        };
    }

};