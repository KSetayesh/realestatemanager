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
            this.createzipCode(),
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
            new Date(),
            new Date(),
            -1,
            -1,
        );

        console.log("listingDetails:", listingDetail);

        return listingDetail;
    }

    protected abstract createListingDetailsId(): number;

    protected abstract createZillowURL(): string;

    protected abstract createAddressId(): number;

    protected abstract createFullAddress(): string;

    protected abstract createState(): State;

    protected abstract createzipCode(): string;

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

}