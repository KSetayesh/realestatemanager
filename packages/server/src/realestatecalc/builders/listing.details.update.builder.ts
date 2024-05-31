import { Country, CreateUpdatePropertyRequest, ListingCreationType, PropertyStatus, PropertyType, State } from "@realestatemanager/shared";
import { AbstractListingDetailsBuilder } from "./listing.details.abstract.builder";
import { ListingDetails } from "../models/listing_models/listingdetails.model";

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
        throw new Error("Method not implemented.");
    }

    protected createZillowURL(): string {
        throw new Error("Method not implemented.");
    }

    protected createAddressId(): number {
        throw new Error("Method not implemented.");
    }

    protected createFullAddress(): string {
        throw new Error("Method not implemented.");
    }

    protected createState(): State {
        throw new Error("Method not implemented.");
    }

    protected createZipCode(): string {
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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

    protected createRentCastSaleResponseId(): number {
        throw new Error("Method not implemented.");
    }

    protected createRentCastPropertyResponseId(): number {
        throw new Error("Method not implemented.");
    }

}