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

    private rentCastSalesResponseTyped: RentCastSaleResponseType;
    private rentCastPropertyTyped?: RentCastPropertyResponseType;
    private listingDetails?: ListingDetails;

    constructor(
        rentCastSalesResponseTyped: RentCastSaleResponseType,
        rentCastPropertyTyped?: RentCastPropertyResponseType,
        listingDetails?: ListingDetails,
    ) {
        super();
        this.rentCastSalesResponseTyped = rentCastSalesResponseTyped;
        this.rentCastPropertyTyped = rentCastPropertyTyped;
        this.listingDetails = listingDetails;
    }

    protected createZillowURL(): string {
        return this.listingDetails?.zillowURL ??
            `NEED TO UPDATE_${this.rentCastSalesResponseTyped.id}`;
    }

    protected createFullAddress(): string {
        return this.listingDetails?.fullAddress ??
            this.rentCastSalesResponseTyped.formattedAddress ??
            this.rentCastPropertyTyped?.formattedAddress ?? '';
    }

    protected createState(): State {
        return this.listingDetails?.state ??
            this.rentCastSalesResponseTyped.state ??
            this.rentCastPropertyTyped?.state; // let it be undefined
    }

    protected createzipCode(): string {
        return this.listingDetails?.zipcode ??
            this.rentCastSalesResponseTyped.zipCode ??
            this.rentCastPropertyTyped?.zipCode ?? '';
    }

    protected createCity(): string {
        return this.listingDetails?.city ??
            this.rentCastSalesResponseTyped.city ??
            this.rentCastPropertyTyped?.city ?? '';
    }

    protected createCounty(): string {
        return this.listingDetails?.county ??
            this.rentCastSalesResponseTyped.county ??
            this.rentCastPropertyTyped?.county ?? '';
    }

    protected createCountry(): Country {
        return Country.UnitedStates;
    }

    protected createStreetAddress(): string {
        return this.listingDetails?.streetAddress ??
            this.rentCastSalesResponseTyped.addressLine1 ??
            this.rentCastPropertyTyped?.addressLine1 ?? '';
    }

    protected createApartmentNumber(): string {
        return this.listingDetails?.apartmentNumber ??
            this.rentCastSalesResponseTyped.addressLine2 ??
            this.rentCastPropertyTyped?.addressLine2 ?? '';
    }

    protected createLongitude(): number {
        return this.listingDetails?.longitude ??
            this.rentCastSalesResponseTyped.longitude ??
            this.rentCastPropertyTyped?.longitude ?? -1;
    }

    protected createLatitude(): number {
        return this.listingDetails?.latitude ??
            this.rentCastSalesResponseTyped.latitude ??
            this.rentCastPropertyTyped?.latitude ?? -1;
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
            this.rentCastSalesResponseTyped.bedrooms ??
            this.rentCastPropertyTyped?.bedrooms ?? -1;
    }

    protected createNumberOfFullBathrooms(): number {
        const numberOfBathrooms = this.listingDetails?.numberOfFullBathrooms ??
            this.rentCastSalesResponseTyped.bathrooms ??
            this.rentCastPropertyTyped?.bathrooms ?? -1;
        return Math.floor(numberOfBathrooms);
    }

    protected createNumberOfHalfBathrooms(): number {
        return this.listingDetails?.numberOfHalfBathrooms ??
            (Utility.isDecimal(this.rentCastSalesResponseTyped.bathrooms ??
                this.rentCastPropertyTyped?.bathrooms ?? -1) ? 1 : 0);
    }

    protected createSquareFeet(): number {
        return this.listingDetails?.squareFeet ??
            this.rentCastSalesResponseTyped.squareFootage ??
            this.rentCastPropertyTyped?.squareFootage ?? -1;
    }

    protected createAcres(): number {
        const lotSize = this.rentCastSalesResponseTyped.lotSize ??
            this.rentCastPropertyTyped?.lotSize;

        return this.listingDetails?.acres ?? (lotSize ? convertSquareFeetToAcres(lotSize) : -1);
    }

    protected createYearBuilt(): number {
        return this.listingDetails?.yearBuilt ??
            this.rentCastSalesResponseTyped.yearBuilt ??
            this.rentCastPropertyTyped?.yearBuilt ?? -1;
    }

    protected createHasGarage(): boolean {
        return this.listingDetails?.hasGarage ??
            this.rentCastPropertyTyped?.features?.garage ?? false;
    }

    protected createHasPool(): boolean {
        return this.listingDetails?.hasPool ??
            this.rentCastPropertyTyped?.features?.pool ?? false;
    }

    protected createHasBasement(): boolean {
        return this.listingDetails?.hasBasement ?? false;
    }

    protected createPropertyType(): PropertyType {
        return this.listingDetails?.propertyType ??
            this.rentCastSalesResponseTyped.propertyType ??
            this.rentCastPropertyTyped?.propertyType; // Let it be undefined
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
        if (this.rentCastPropertyTyped && this.rentCastPropertyTyped.previousYearPropertyTaxes > -1) {
            propertyTax = Utility.round(this.rentCastPropertyTyped.previousYearPropertyTaxes / 12);
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
            this.rentCastSalesResponseTyped.price ?? -1;
    }

    // Come back to this and make sure its the right type
    protected createCreationType(): ListingCreationType {
        return ListingCreationType.MATCHED_PRE_EXISTING_RENT_CAST_DATA;
    }

    protected createDateListed(): Date {
        const daysOnMarket = this.rentCastSalesResponseTyped.daysOnMarket ?? 0;
        const listedDate = this.rentCastSalesResponseTyped.listedDate ?? Utility.getDateNDaysAgo(daysOnMarket);

        // Need to figure out what to do with below code
        // return this.listingDetails?.dateListed ?? listedDate;

        // Come back to this and make sure the string is being parsed correctly
        return new Date(listedDate);
    }

    protected createPropertyStatus(): PropertyStatus {
        return this.listingDetails?.propertyStatus ??
            this.rentCastSalesResponseTyped.status;
    }


}