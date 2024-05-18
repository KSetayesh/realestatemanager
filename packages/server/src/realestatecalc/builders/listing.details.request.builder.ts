import { Country, CreateListingDetailsRequest, ListingCreationType, PropertyStatus, PropertyType, State, Utility } from "@realestatemanager/shared";
import { AbstractListingDetailsBuilder } from "./listing.details.abstract.builder";

export class ListingDetailsRequestBuilder extends AbstractListingDetailsBuilder {

    private listingDetailsRequest: CreateListingDetailsRequest;

    constructor(listingDetailsRequest: CreateListingDetailsRequest) {
        super();
        this.listingDetailsRequest = listingDetailsRequest;
    }

    protected createZillowURL(): string {
        return this.listingDetailsRequest.zillowURL;
    }

    protected createFullAddress(): string {
        return this.listingDetailsRequest.propertyDetails.address.fullAddress;
    }

    protected createState(): State {
        return this.listingDetailsRequest.propertyDetails.address.state;
    }

    protected createzipCode(): string {
        return this.listingDetailsRequest.propertyDetails.address.zipcode;
    }

    protected createCity(): string {
        return this.listingDetailsRequest.propertyDetails.address.city;
    }

    protected createCounty(): string {
        return this.listingDetailsRequest.propertyDetails.address.county;
    }

    protected createCountry(): Country {
        return this.listingDetailsRequest.propertyDetails.address.country;
    }

    protected createStreetAddress(): string {
        return this.listingDetailsRequest.propertyDetails.address.streetAddress;
    }

    protected createApartmentNumber(): string {
        return this.listingDetailsRequest.propertyDetails.address.apartmentNumber;
    }

    protected createLongitude(): number {
        return this.listingDetailsRequest.propertyDetails.address.longitude;
    }

    protected createLatitude(): number {
        return this.listingDetailsRequest.propertyDetails.address.latitude;
    }

    protected createElementarySchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails.schoolRating.elementarySchoolRating;
    }

    protected createMiddleSchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails.schoolRating.middleSchoolRating;
    }

    protected createHighSchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails.schoolRating.highSchoolRating;
    }

    protected createNumberOfBedrooms(): number {
        return this.listingDetailsRequest.propertyDetails.numberOfBedrooms;
    }

    protected createNumberOfFullBathrooms(): number {
        return this.listingDetailsRequest.propertyDetails.numberOfFullBathrooms;
    }

    protected createNumberOfHalfBathrooms(): number {
        return this.listingDetailsRequest.propertyDetails.numberOfHalfBathrooms;
    }

    protected createSquareFeet(): number {
        return this.listingDetailsRequest.propertyDetails.squareFeet;
    }

    protected createAcres(): number {
        return this.listingDetailsRequest.propertyDetails.acres;
    }

    protected createYearBuilt(): number {
        return this.listingDetailsRequest.propertyDetails.yearBuilt;
    }

    protected createHasGarage(): boolean {
        return this.listingDetailsRequest.propertyDetails.hasGarage;
    }

    protected createHasPool(): boolean {
        return this.listingDetailsRequest.propertyDetails.hasPool;
    }

    protected createHasBasement(): boolean {
        return this.listingDetailsRequest.propertyDetails.hasBasement;
    }

    protected createPropertyType(): PropertyType {
        return this.listingDetailsRequest.propertyDetails.propertyType;
    }

    protected createDescription(): string {
        return this.listingDetailsRequest.propertyDetails.description;
    }

    protected createZestimate(): number {
        return this.listingDetailsRequest.zillowMarketEstimates.zestimate;
    }

    protected createZestimateRangeLow(): number {
        return this.listingDetailsRequest.zillowMarketEstimates.zestimateRange.low;
    }

    protected createZestimateRangeHigh(): number {
        return this.listingDetailsRequest.zillowMarketEstimates.zestimateRange.high;
    }

    protected createZillowRentEstimate(): number {
        return this.listingDetailsRequest.zillowMarketEstimates.zillowRentEstimate;
    }

    protected createZillowMonthlyPropertyTaxAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates.zillowMonthlyPropertyTaxAmount;
    }

    protected createZillowMonthlyHomeInsuranceAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates.zillowMonthlyHomeInsuranceAmount;
    }

    protected createZillowMonthlyHOAFeesAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates.zillowMonthlyHOAFeesAmount;
    }

    protected createListingPrice(): number {
        return this.listingDetailsRequest.listingPrice;
    }

    // Come back to this
    protected createCreationType(): ListingCreationType {
        return;
    }

    protected createDateListed(): Date {
        const listedDate = Utility.getDateNDaysAgo(this.listingDetailsRequest.numberOfDaysOnMarket);
        // Come back to this and make sure the string is being parsed correctly
        return new Date(listedDate);
    }

    protected createPropertyStatus(): PropertyStatus {
        return this.listingDetailsRequest.propertyStatus;
    }


}