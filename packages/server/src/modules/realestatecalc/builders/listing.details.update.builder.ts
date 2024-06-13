import {
    Country,
    CreateUpdatePropertyRequest,
    ListingCreationType,
    PropertyStatus,
    PropertyType,
    State
} from "@realestatemanager/types";
import { AbstractListingDetailsBuilder } from "../../../shared/listing.details.abstract.builder";
import { ListingDetails } from "../models/listingdetails.model";

export class ListingDetailsUpdateBuilder extends AbstractListingDetailsBuilder {

    private listingDetails: ListingDetails;
    private updatePropertyRequest: CreateUpdatePropertyRequest;

    constructor(
        listingDetails: ListingDetails,
        updatePropertyRequest: CreateUpdatePropertyRequest,
    ) {
        super();
        this.listingDetails = listingDetails;
        this.updatePropertyRequest = updatePropertyRequest;
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
        return this.listingDetails.fullAddress;
    }

    protected createState(): State {
        return this.listingDetails.state;
    }

    protected createZipCode(): string {
        return this.listingDetails.zipcode;
    }

    protected createCity(): string {
        return this.listingDetails.city;
    }

    protected createCounty(): string {
        return this.listingDetails.county;
    }

    protected createCountry(): Country {
        return this.listingDetails.country;
    }

    protected createStreetAddress(): string {
        return this.listingDetails.streetAddress;
    }

    protected createApartmentNumber(): string {
        return this.listingDetails.apartmentNumber;
    }

    protected createLongitude(): number {
        return this.listingDetails.longitude;
    }

    protected createLatitude(): number {
        return this.listingDetails.latitude;
    }

    protected createSchoolRatingId(): number {
        return this.listingDetails.schoolRatingId;
    }

    protected createElementarySchoolRating(): number {
        return this.updatePropertyRequest.elementarySchoolRating ?? this.listingDetails.elementarySchoolRating;
    }

    protected createMiddleSchoolRating(): number {
        return this.updatePropertyRequest.middleSchoolRating ?? this.listingDetails.middleSchoolRating;
    }

    protected createHighSchoolRating(): number {
        return this.updatePropertyRequest.highSchoolRating ?? this.listingDetails.highSchoolRating;
    }

    protected createPropertyDetailsId(): number {
        return this.listingDetails.propertyDetailsId;
    }

    protected createNumberOfBedrooms(): number {
        return this.updatePropertyRequest.numberOfBedrooms ?? this.listingDetails.numberOfBedrooms;
    }

    protected createNumberOfFullBathrooms(): number {
        return this.updatePropertyRequest.numberOfFullBathrooms ?? this.listingDetails.numberOfFullBathrooms;
    }

    protected createNumberOfHalfBathrooms(): number {
        return this.updatePropertyRequest.numberOfHalfBathrooms ?? this.listingDetails.numberOfHalfBathrooms;
    }

    protected createSquareFeet(): number {
        return this.updatePropertyRequest.squareFeet ?? this.listingDetails.squareFeet;
    }

    protected createAcres(): number {
        return this.updatePropertyRequest.acres ?? this.listingDetails.acres;
    }

    protected createYearBuilt(): number {
        return this.updatePropertyRequest.yearBuilt ?? this.listingDetails.yearBuilt;
    }

    protected createHasGarage(): boolean {
        return this.updatePropertyRequest.hasGarage ?? this.listingDetails.hasGarage;
    }

    protected createHasPool(): boolean {
        return this.updatePropertyRequest.hasPool ?? this.listingDetails.hasPool;
    }

    protected createHasBasement(): boolean {
        return this.updatePropertyRequest.hasBasement ?? this.listingDetails.hasBasement;
    }

    protected createPropertyType(): PropertyType {
        return this.listingDetails.propertyType;
    }

    protected createDescription(): string {
        return this.updatePropertyRequest.description ?? this.listingDetails.description;
    }

    protected createZillowMarketEstimatesId(): number {
        return this.listingDetails.zillowMarketEstimatesId;
    }

    protected createZestimate(): number {
        return this.updatePropertyRequest.zestimate ?? this.listingDetails.zestimate;
    }

    protected createZestimateRangeLow(): number {
        return this.updatePropertyRequest.zestimateRangeLow ?? this.listingDetails.zestimateRangeLow;
    }

    protected createZestimateRangeHigh(): number {
        return this.updatePropertyRequest.zestimateRangeHigh ?? this.listingDetails.zestimateRangeHigh;
    }

    protected createZillowRentEstimate(): number {
        return this.updatePropertyRequest.zillowRentEstimate ?? this.listingDetails.zillowRentEstimate;
    }

    protected createZillowMonthlyPropertyTaxAmount(): number {
        return this.updatePropertyRequest.zillowMonthlyPropertyTaxAmount ?? this.listingDetails.zillowMonthlyPropertyTaxAmount;
    }

    protected createZillowMonthlyHomeInsuranceAmount(): number {
        return this.updatePropertyRequest.zillowMonthlyHomeInsuranceAmount ?? this.listingDetails.zillowMonthlyHomeInsuranceAmount;
    }

    protected createZillowMonthlyHOAFeesAmount(): number {
        return this.updatePropertyRequest.zillowMonthlyHOAFeesAmount ?? this.listingDetails.zillowMonthlyHOAFeesAmount;
    }

    protected createListingPrice(): number {
        return this.updatePropertyRequest.listingPrice ?? this.listingDetails.listingPrice;
    }

    protected createCreationType(): ListingCreationType {
        return this.listingDetails.creationType;
    }

    protected createDateListed(): Date {
        return this.listingDetails.dateListed;
    }

    protected createPropertyStatus(): PropertyStatus {
        return this.listingDetails.propertyStatus;
    }

    protected createRentCastSaleResponseId(): number {
        return this.listingDetails.rentCastSaleResponseId;
    }

    protected createRentCastPropertyResponseId(): number {
        return this.listingDetails.rentCastPropertyResponseId;
    }

}