import {
    Country,
    ListingCreationType,
    PropertyStatus,
    PropertyType,
    State,
    Utility
} from "@realestatemanager/shared";
import { ListingDetails } from "../models/listing_models/listingdetails.model";
import { RentCastPropertyResponseType, RentCastSaleResponseType } from "../services/rentcast.service";
import { convertSquareFeetToAcres } from "src/shared/Constants";
import { AbstractListingDetailsBuilder } from "./listing.details.abstract.builder";

export class ListingDetailsBuilder extends AbstractListingDetailsBuilder {

    private rentCastSalesResponseType: RentCastSaleResponseType;
    private rentCastPropertyType?: RentCastPropertyResponseType;
    private listingDetails?: ListingDetails;

    constructor(
        rentCastSalesResponseType: RentCastSaleResponseType,
        rentCastPropertyType?: RentCastPropertyResponseType,
        listingDetails?: ListingDetails,
    ) {
        super();
        this.rentCastSalesResponseType = rentCastSalesResponseType;
        this.rentCastPropertyType = rentCastPropertyType;
        this.listingDetails = listingDetails;
    }

    protected createListingDetailsId(): number {
        return this.listingDetails?.id ?? -1;
    }

    protected createAddressId(): number {
        return this.listingDetails?.addressId ?? -1;
    }

    protected createSchoolRatingId(): number {
        return this.listingDetails?.schoolRatingId ?? -1;
    }

    protected createPropertyDetailsId(): number {
        return this.listingDetails?.propertyDetailsId ?? -1;
    }

    protected createZillowMarketEstimatesId(): number {
        return this.listingDetails?.zillowMarketEstimatesId ?? -1;
    }

    protected createZillowURL(): string {
        return this.listingDetails?.zillowURL ??
            `NEED TO UPDATE_${this.rentCastSalesResponseType.id}`;
    }

    protected createFullAddress(): string {
        return this.listingDetails?.fullAddress ??
            this.rentCastSalesResponseType.formattedAddress ??
            this.rentCastPropertyType?.formattedAddress ?? '';
    }

    protected createState(): State {
        return this.listingDetails?.state ??
            this.rentCastSalesResponseType.state ??
            this.rentCastPropertyType?.state; // let it be undefined
    }

    protected createzipCode(): string {
        return this.listingDetails?.zipcode ??
            this.rentCastSalesResponseType.zipCode ??
            this.rentCastPropertyType?.zipCode ?? '';
    }

    protected createCity(): string {
        return this.listingDetails?.city ??
            this.rentCastSalesResponseType.city ??
            this.rentCastPropertyType?.city ?? '';
    }

    protected createCounty(): string {
        return this.listingDetails?.county ??
            this.rentCastSalesResponseType.county ??
            this.rentCastPropertyType?.county ?? '';
    }

    protected createCountry(): Country {
        return Country.UnitedStates;
    }

    protected createStreetAddress(): string {
        return this.listingDetails?.streetAddress ??
            this.rentCastSalesResponseType.addressLine1 ??
            this.rentCastPropertyType?.addressLine1 ?? '';
    }

    protected createApartmentNumber(): string {
        return this.listingDetails?.apartmentNumber ??
            this.rentCastSalesResponseType.addressLine2 ??
            this.rentCastPropertyType?.addressLine2 ?? '';
    }

    protected createLongitude(): number {
        return this.listingDetails?.longitude ??
            this.rentCastSalesResponseType.longitude ??
            this.rentCastPropertyType?.longitude ?? -1;
    }

    protected createLatitude(): number {
        return this.listingDetails?.latitude ??
            this.rentCastSalesResponseType.latitude ??
            this.rentCastPropertyType?.latitude ?? -1;
    }

    protected createElementarySchoolRating(): number {
        return this.listingDetails?.elementarySchoolRating ?? -1;
    }

    protected createMiddleSchoolRating(): number {
        return this.listingDetails?.middleSchoolRating ?? -1;
    }

    protected createHighSchoolRating(): number {
        return this.listingDetails?.highSchoolRating ?? -1;
    }

    protected createNumberOfBedrooms(): number {
        return this.listingDetails?.numberOfBedrooms ??
            this.rentCastSalesResponseType.bedrooms ??
            this.rentCastPropertyType?.bedrooms ?? -1;
    }

    protected createNumberOfFullBathrooms(): number {
        const numberOfBathrooms = this.listingDetails?.numberOfFullBathrooms ??
            this.rentCastSalesResponseType.bathrooms ??
            this.rentCastPropertyType?.bathrooms ?? -1;
        return Math.floor(numberOfBathrooms);
    }

    protected createNumberOfHalfBathrooms(): number {
        return this.listingDetails?.numberOfHalfBathrooms ??
            (Utility.isDecimal(this.rentCastSalesResponseType.bathrooms ??
                this.rentCastPropertyType?.bathrooms ?? -1) ? 1 : 0);
    }

    protected createSquareFeet(): number {
        return this.listingDetails?.squareFeet ??
            this.rentCastSalesResponseType.squareFootage ??
            this.rentCastPropertyType?.squareFootage ?? -1;
    }

    protected createAcres(): number {
        const lotSize = this.rentCastSalesResponseType.lotSize ??
            this.rentCastPropertyType?.lotSize;

        return this.listingDetails?.acres ?? (lotSize ? convertSquareFeetToAcres(lotSize) : -1);
    }

    protected createYearBuilt(): number {
        return this.listingDetails?.yearBuilt ??
            this.rentCastSalesResponseType.yearBuilt ??
            this.rentCastPropertyType?.yearBuilt ?? -1;
    }

    protected createHasGarage(): boolean {
        return this.listingDetails?.hasGarage ??
            this.rentCastPropertyType?.features?.garage ?? false;
    }

    protected createHasPool(): boolean {
        return this.listingDetails?.hasPool ??
            this.rentCastPropertyType?.features?.pool ?? false;
    }

    protected createHasBasement(): boolean {
        return this.listingDetails?.hasBasement ?? false;
    }

    protected createPropertyType(): PropertyType {
        return this.listingDetails?.propertyType ??
            this.rentCastSalesResponseType.propertyType ??
            this.rentCastPropertyType?.propertyType; // Let it be undefined
    }

    protected createDescription(): string {
        return this.listingDetails?.description ?? '';
    }

    protected createZestimate(): number {
        return this.listingDetails?.zestimate ?? -1;
    }

    protected createZestimateRangeLow(): number {
        return this.listingDetails?.zestimateRangeLow ?? -1;
    }

    protected createZestimateRangeHigh(): number {
        return this.listingDetails?.zestimateRangeHigh ?? -1;
    }

    protected createZillowRentEstimate(): number {
        return this.listingDetails?.zillowRentEstimate ?? -1;
    }

    protected createZillowMonthlyPropertyTaxAmount(): number {
        let propertyTax = -1;
        if (this.rentCastPropertyType && this.rentCastPropertyType.previousYearPropertyTaxes > -1) {
            propertyTax = Utility.round(this.rentCastPropertyType.previousYearPropertyTaxes / 12);
        }

        return this.listingDetails?.zillowMonthlyPropertyTaxAmount ?? propertyTax;
    }

    protected createZillowMonthlyHomeInsuranceAmount(): number {
        return this.listingDetails?.zillowMonthlyHomeInsuranceAmount ?? -1;
    }

    protected createZillowMonthlyHOAFeesAmount(): number {
        return this.listingDetails?.zillowMonthlyHOAFeesAmount ?? -1;
    }

    protected createListingPrice(): number {
        return this.listingDetails?.listingPrice ??
            this.rentCastSalesResponseType.price ?? -1;
    }

    // Come back to this and make sure its the right type
    protected createCreationType(): ListingCreationType {
        return ListingCreationType.MATCHED_PRE_EXISTING_RENT_CAST_DATA;
    }

    protected createDateListed(): Date {
        const daysOnMarket = this.rentCastSalesResponseType.daysOnMarket ?? 0;
        const listedDate = this.rentCastSalesResponseType.listedDate ?? Utility.getDateNDaysAgo(daysOnMarket);

        // Need to figure out what to do with below code
        // return this.listingDetails?.dateListed ?? listedDate;

        // Come back to this and make sure the string is being parsed correctly
        return new Date(listedDate);
    }

    protected createPropertyStatus(): PropertyStatus {
        return this.listingDetails?.propertyStatus ??
            this.rentCastSalesResponseType.status;
    }

    protected rentCastSaleResponseId(): number {
        return -1; // change this
    }

    protected rentCastPropertyResponseId(): number {
        return -1; // change this
    }

}