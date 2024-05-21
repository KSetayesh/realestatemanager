import {
    Country,
    ListingCreationType,
    PropertyStatus,
    PropertyType,
    State
} from "@realestatemanager/shared";
import { Address } from "../models/listing_models/address.model";
import { ListingDetails } from "../models/listing_models/listingdetails.model";
import { PropertyDetails } from "../models/listing_models/propertydetails.model";
import { SchoolRating } from "../models/listing_models/schoolrating.model";
import { ZillowMarketEstimates } from "../models/listing_models/zillowmarketestimates.model";

export abstract class AbstractListingDetailsBuilder {

    build(): ListingDetails {

        const address: Address = new Address(
            this.createAddressId(),
            this.createFullAddress(),
            this.createState(),
            this.createZipCode(),
            this.createCity(),
            this.createCounty(),
            this.createCountry(),
            this.createStreetAddress(),
            this.createApartmentNumber(),
            this.createLongitude(),
            this.createLatitude(),
        );

        const schoolRating: SchoolRating = new SchoolRating(
            this.createSchoolRatingId(),
            this.createElementarySchoolRating(),
            this.createMiddleSchoolRating(),
            this.createHighSchoolRating(),
        );

        const propertyDetails: PropertyDetails = new PropertyDetails(
            this.createPropertyDetailsId(),
            address,
            schoolRating,
            this.createNumberOfBedrooms(),
            this.createNumberOfFullBathrooms(),
            this.createNumberOfHalfBathrooms(),
            this.createSquareFeet(),
            this.createAcres(),
            this.createYearBuilt(),
            this.createHasGarage(),
            this.createHasPool(),
            this.createHasBasement(),
            this.createPropertyType(),
            this.createDescription(),
        );

        const zillowMarketEstimates: ZillowMarketEstimates = new ZillowMarketEstimates(
            this.createZillowMarketEstimatesId(),
            this.createZestimate(),
            this.createZestimateRangeLow(),
            this.createZestimateRangeHigh(),
            this.createZillowRentEstimate(),
            this.createZillowMonthlyPropertyTaxAmount(),
            this.createZillowMonthlyHomeInsuranceAmount(),
            this.createZillowMonthlyHOAFeesAmount(),
        );

        const listingDetail: ListingDetails = new ListingDetails(
            this.createListingDetailsId(),
            this.createZillowURL(),
            propertyDetails,
            zillowMarketEstimates,
            this.createListingPrice(),
            this.createPropertyStatus(),
            this.createCreationType(),
            this.createDateListed(),
            undefined, // When we insert into database we will create the date
            undefined, // When we insert into database we will create the date
            this.createRentCastSaleResponseId(),
            this.createRentCastPropertyResponseId(),
        );

        console.log("listingDetails:", listingDetail);

        return listingDetail;
    }

    protected abstract createListingDetailsId(): number;

    protected abstract createZillowURL(): string;

    protected abstract createAddressId(): number;

    protected abstract createFullAddress(): string;

    protected abstract createState(): State;

    protected abstract createZipCode(): string;

    protected abstract createCity(): string;

    protected abstract createCounty(): string;

    protected abstract createCountry(): Country;

    protected abstract createStreetAddress(): string;

    protected abstract createApartmentNumber(): string;

    protected abstract createLongitude(): number;

    protected abstract createLatitude(): number;

    protected abstract createSchoolRatingId(): number;

    protected abstract createElementarySchoolRating(): number;

    protected abstract createMiddleSchoolRating(): number;

    protected abstract createHighSchoolRating(): number;

    protected abstract createPropertyDetailsId(): number;

    protected abstract createNumberOfBedrooms(): number;

    protected abstract createNumberOfFullBathrooms(): number;

    protected abstract createNumberOfHalfBathrooms(): number;

    protected abstract createSquareFeet(): number;

    protected abstract createAcres(): number;

    protected abstract createYearBuilt(): number;

    protected abstract createHasGarage(): boolean;

    protected abstract createHasPool(): boolean;

    protected abstract createHasBasement(): boolean;

    protected abstract createPropertyType(): PropertyType;

    protected abstract createDescription(): string;

    protected abstract createZillowMarketEstimatesId(): number;

    protected abstract createZestimate(): number;

    protected abstract createZestimateRangeLow(): number;

    protected abstract createZestimateRangeHigh(): number;

    protected abstract createZillowRentEstimate(): number;

    protected abstract createZillowMonthlyPropertyTaxAmount(): number;

    protected abstract createZillowMonthlyHomeInsuranceAmount(): number;

    protected abstract createZillowMonthlyHOAFeesAmount(): number;

    protected abstract createListingPrice(): number;

    protected abstract createCreationType(): ListingCreationType;

    protected abstract createDateListed(): Date;

    protected abstract createPropertyStatus(): PropertyStatus;

    protected abstract createRentCastSaleResponseId(): number;

    protected abstract createRentCastPropertyResponseId(): number;

    protected abstract get defaultZillowURL(): string;

    protected get defaultListingDetailsId(): number {
        return -1;
    }

    protected get defaultAddressId(): number {
        return -1;
    }

    protected get defaultFullAddress(): string {
        return '';
    }

    protected get defaultState(): State {
        return; // Let it be undefined
    }

    protected get defaultZipCode(): string {
        return '';
    }

    protected get defaultCity(): string {
        return '';
    }

    protected get defaultCounty(): string {
        return '';
    }

    protected get defaultCountry(): Country {
        return Country.UnitedStates;
    }

    protected get defaultStreetAddress(): string {
        return '';
    }

    protected get defaultApartmentNumber(): string {
        return '';
    }

    protected get defaultLongitude(): number {
        return -1;
    }

    protected get defaultLatitude(): number {
        return -1;
    }

    protected get defaultSchoolRatingId(): number {
        return -1;
    }

    protected get defaultElementarySchoolRating(): number {
        return -1;
    }

    protected get defaultMiddleSchoolRating(): number {
        return -1;
    }

    protected get defaultHighSchoolRating(): number {
        return -1;
    }

    protected get defaultPropertyDetailsId(): number {
        return -1;
    }

    protected get defaultNumberOfBedrooms(): number {
        return -1;
    }

    protected get defaultNumberOfFullBathrooms(): number {
        return -1;
    }

    protected get defaultNumberOfHalfBathrooms(): number {
        return -1;
    }

    protected get defaultSquareFeet(): number {
        return -1;
    }

    protected get defaultAcres(): number {
        return -1;
    }

    protected get defaultYearBuilt(): number {
        return -1;
    }

    protected get defaultHasGarage(): boolean {
        return; // let it be undefined 
    }

    protected get defaultHasPool(): boolean {
        return; // let it be undefined 
    }

    protected get defaultHasBasement(): boolean {
        return; // let it be undefined 
    }

    protected get defaultPropertyType(): PropertyType {
        return; // let it be undefined 
    }

    protected get defaultDescription(): string {
        return '';
    }

    protected get defaultZillowMarketEstimatesId(): number {
        return -1;
    }

    protected get defaultZestimate(): number {
        return -1;
    }

    protected get defaultZestimateRangeLow(): number {
        return -1;
    }

    protected get defaultZestimateRangeHigh(): number {
        return -1;
    }

    protected get defaultZillowRentEstimate(): number {
        return -1;
    }

    protected get defaultZillowMonthlyPropertyTaxAmount(): number {
        return -1;
    }

    protected get defaultZillowMonthlyHomeInsuranceAmount(): number {
        return -1;
    }

    protected get defaultZillowMonthlyHOAFeesAmount(): number {
        return -1;
    }

    protected get defaultListingPrice(): number {
        return -1;
    }

    protected get defaultCreationType(): ListingCreationType {
        return; // let it be undefined 
    }

    protected get defaultDateListed(): Date {
        return; // let it be undefined 
    }

    protected get defaultPropertyStatus(): PropertyStatus {
        return; // let it be undefined 
    }

    protected get defaultRentCastSaleResponseId(): number {
        return -1;
    }

    protected get defaultRentCastPropertyResponseId(): number {
        return -1;
    }

}