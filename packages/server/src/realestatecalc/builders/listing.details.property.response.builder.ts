import { State, Country, PropertyType, ListingCreationType, PropertyStatus } from "@realestatemanager/shared";
import { AbstractListingDetailsBuilder } from "./listing.details.abstract.builder";
import { ListingDetails } from "../models/listing_models/listingdetails.model";
import { RentCastPropertyResponseType, RentCastSaleResponseType } from "../services/rentcast.service";

/* 
    The order of creating the properties in this Builder class is 
    1) rentCastPropertyType
    2) listingDetails
    3) rentCastSaleResponseType
*/

export class ListingDetailsPropertyResponseBuilder extends AbstractListingDetailsBuilder {

    private _rentCastPropertyResponseId: number;
    private rentCastPropertyType: RentCastPropertyResponseType;
    private listingDetails: ListingDetails;
    private rentCastSaleResponseType: RentCastSaleResponseType;

    constructor(
        rentCastPropertyResponseId: number,
        rentCastPropertyType: RentCastPropertyResponseType,
        listingDetails: ListingDetails,
        rentCastSaleResponseType: RentCastSaleResponseType,
    ) {
        super();
        this._rentCastPropertyResponseId = rentCastPropertyResponseId;
        this.rentCastPropertyType = rentCastPropertyType;
        this.listingDetails = listingDetails;
        this.rentCastSaleResponseType = rentCastSaleResponseType;
    }

    protected createListingDetailsId(): number {
        return this.listingDetails.id;
    }

    protected createZillowURL(): string {
        return this.listingDetails.zillowURL;
    }

    protected createAddressId(): number {
        return this.listingDetails.addressId;
    }

    protected createFullAddress(): string {
        throw new Error("Method not implemented.");
    }

    protected createState(): State {
        throw new Error("Method not implemented.");
    }

    protected createzipCode(): string {
        throw new Error("Method not implemented.");
    }

    protected createCity(): string {
        throw new Error("Method not implemented.");
    }

    protected createCounty(): string {
        throw new Error("Method not implemented.");
    }

    protected createCountry(): Country {
        throw new Error("Method not implemented.");
    }

    protected createStreetAddress(): string {
        throw new Error("Method not implemented.");
    }

    protected createApartmentNumber(): string {
        throw new Error("Method not implemented.");
    }

    protected createLongitude(): number {
        throw new Error("Method not implemented.");
    }

    protected createLatitude(): number {
        throw new Error("Method not implemented.");
    }

    protected createSchoolRatingId(): number {
        return this.listingDetails.schoolRatingId;
    }

    protected createElementarySchoolRating(): number {
        throw new Error("Method not implemented.");
    }

    protected createMiddleSchoolRating(): number {
        throw new Error("Method not implemented.");
    }

    protected createHighSchoolRating(): number {
        throw new Error("Method not implemented.");
    }

    protected createPropertyDetailsId(): number {
        return this.listingDetails.propertyDetailsId;
    }

    protected createNumberOfBedrooms(): number {
        throw new Error("Method not implemented.");
    }

    protected createNumberOfFullBathrooms(): number {
        throw new Error("Method not implemented.");
    }

    protected createNumberOfHalfBathrooms(): number {
        throw new Error("Method not implemented.");
    }

    protected createSquareFeet(): number {
        throw new Error("Method not implemented.");
    }

    protected createAcres(): number {
        throw new Error("Method not implemented.");
    }

    protected createYearBuilt(): number {
        throw new Error("Method not implemented.");
    }

    protected createHasGarage(): boolean {
        throw new Error("Method not implemented.");
    }

    protected createHasPool(): boolean {
        throw new Error("Method not implemented.");
    }

    protected createHasBasement(): boolean {
        throw new Error("Method not implemented.");
    }

    protected createPropertyType(): PropertyType {
        throw new Error("Method not implemented.");
    }

    protected createDescription(): string {
        throw new Error("Method not implemented.");
    }

    protected createZillowMarketEstimatesId(): number {
        return this.listingDetails.zillowMarketEstimatesId;
    }

    protected createZestimate(): number {
        throw new Error("Method not implemented.");
    }

    protected createZestimateRangeLow(): number {
        throw new Error("Method not implemented.");
    }

    protected createZestimateRangeHigh(): number {
        throw new Error("Method not implemented.");
    }

    protected createZillowRentEstimate(): number {
        throw new Error("Method not implemented.");
    }

    protected createZillowMonthlyPropertyTaxAmount(): number {
        throw new Error("Method not implemented.");
    }

    protected createZillowMonthlyHomeInsuranceAmount(): number {
        throw new Error("Method not implemented.");
    }

    protected createZillowMonthlyHOAFeesAmount(): number {
        throw new Error("Method not implemented.");
    }

    protected createListingPrice(): number {
        throw new Error("Method not implemented.");
    }

    protected createCreationType(): ListingCreationType {
        throw new Error("Method not implemented.");
    }

    protected createDateListed(): Date {
        throw new Error("Method not implemented.");
    }

    protected createPropertyStatus(): PropertyStatus {
        throw new Error("Method not implemented.");
    }

    protected rentCastSaleResponseId(): number {
        throw this.listingDetails.rentCastSaleResponseId;
    }

    protected rentCastPropertyResponseId(): number {
        return this._rentCastPropertyResponseId;
    }

}