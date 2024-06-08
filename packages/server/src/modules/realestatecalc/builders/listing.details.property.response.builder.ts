import { State, Country, PropertyType, ListingCreationType, PropertyStatus, Utility } from "@realestatemanager/shared";
import { AbstractListingDetailsBuilder } from "./listing.details.abstract.builder";
import { ListingDetails } from "../models/listing_models/listingdetails.model";
import { RentCastPropertyResponseType } from "../services/rentcast.service";
import { convertSquareFeetToAcres } from "src/shared/Constants";

/* 
    The order of creating the properties in this Builder class is 
    1) listingDetails (this is fetched from the database)
    2) rentCastPropertyType
*/

export class ListingDetailsPropertyResponseBuilder extends AbstractListingDetailsBuilder {

    private _rentCastPropertyResponseId: number;
    private listingDetails: ListingDetails;
    private rentCastPropertyType: RentCastPropertyResponseType;

    constructor(
        rentCastPropertyResponseId: number,
        listingDetails: ListingDetails,
        rentCastPropertyType: RentCastPropertyResponseType,
    ) {
        super();
        this._rentCastPropertyResponseId = rentCastPropertyResponseId;
        this.listingDetails = listingDetails;
        this.rentCastPropertyType = rentCastPropertyType;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createListingDetailsId(): number {
        return this.listingDetails.id;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZillowURL(): string {
        return this.listingDetails.zillowURL;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createAddressId(): number {
        return this.listingDetails.addressId;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createFullAddress(): string {
        return this.listingDetails.fullAddress ?? this.rentCastPropertyType.formattedAddress;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createState(): State {
        return this.listingDetails.state ?? Utility.getEnumValue(State, this.rentCastPropertyType.state);
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZipCode(): string {
        return this.listingDetails.zipcode ?? this.rentCastPropertyType.zipCode;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createCity(): string {
        return this.listingDetails.city ?? this.rentCastPropertyType.city;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createCounty(): string {
        return this.listingDetails.county ?? this.rentCastPropertyType.county;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createCountry(): Country {
        return this.listingDetails.country;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createStreetAddress(): string {
        return this.listingDetails.streetAddress ?? this.rentCastPropertyType.addressLine1;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createApartmentNumber(): string {
        return this.listingDetails.apartmentNumber ?? this.rentCastPropertyType.addressLine2;
    }
    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createLongitude(): number {
        return this.listingDetails.longitude ?? this.rentCastPropertyType.longitude;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createLatitude(): number {
        return this.listingDetails.latitude ?? this.rentCastPropertyType.latitude;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createSchoolRatingId(): number {
        return this.listingDetails.schoolRatingId;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createElementarySchoolRating(): number {
        return this.listingDetails.elementarySchoolRating;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createMiddleSchoolRating(): number {
        return this.listingDetails.middleSchoolRating;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createHighSchoolRating(): number {
        return this.listingDetails.highSchoolRating;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createPropertyDetailsId(): number {
        return this.listingDetails.propertyDetailsId;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createNumberOfBedrooms(): number {
        return this.listingDetails.numberOfBedrooms ?? this.rentCastPropertyType.bedrooms;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createNumberOfFullBathrooms(): number {
        const numberOfBathrooms = this.listingDetails.numberOfFullBathrooms ??
            this.rentCastPropertyType.bathrooms;
        return Math.floor(numberOfBathrooms);
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createNumberOfHalfBathrooms(): number {
        let numberOfHalfBathrooms = this.listingDetails.numberOfHalfBathrooms ?? -1;

        if (numberOfHalfBathrooms > -1) {
            return numberOfHalfBathrooms;
        }

        numberOfHalfBathrooms = this.rentCastPropertyType.bathrooms ?? -1;

        if (numberOfHalfBathrooms > -1) {
            return Utility.isDecimal(this.rentCastPropertyType.bathrooms) ? 1 : 0;
        }

        return this.listingDetails.numberOfHalfBathrooms;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createSquareFeet(): number {
        return this.listingDetails.squareFeet ?? this.rentCastPropertyType.squareFootage;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createAcres(): number {
        const acres = this.listingDetails.acres ?? -1;
        if (acres > -1) {
            return acres;
        }

        const lotSize = this.rentCastPropertyType.lotSize ?? -1;
        if (lotSize > -1) {
            return convertSquareFeetToAcres(lotSize);
        }
        return acres;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createYearBuilt(): number {
        return this.listingDetails.yearBuilt ?? this.rentCastPropertyType.yearBuilt;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createHasGarage(): boolean {
        return this.listingDetails.hasGarage ?? this.rentCastPropertyType.features.garage;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createHasPool(): boolean {
        return this.listingDetails.hasPool ?? this.rentCastPropertyType.features.pool;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createHasBasement(): boolean {
        return this.listingDetails.hasBasement;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createPropertyType(): PropertyType {
        return this.listingDetails.propertyType ?? this.rentCastPropertyType.propertyType;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createDescription(): string {
        return this.listingDetails.description;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZillowMarketEstimatesId(): number {
        return this.listingDetails.zillowMarketEstimatesId;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZestimate(): number {
        return this.listingDetails.zestimate;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZestimateRangeLow(): number {
        return this.listingDetails.zestimateRangeLow;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZestimateRangeHigh(): number {
        return this.listingDetails.zestimateRangeHigh;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZillowRentEstimate(): number {
        return this.listingDetails.zillowRentEstimate;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZillowMonthlyPropertyTaxAmount(): number {
        return this.listingDetails.zillowMonthlyPropertyTaxAmount ?? this.rentCastPropertyType.previousYearPropertyTaxes;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZillowMonthlyHomeInsuranceAmount(): number {
        return this.listingDetails.zillowMonthlyHomeInsuranceAmount;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createZillowMonthlyHOAFeesAmount(): number {
        return this.listingDetails.zillowMonthlyHOAFeesAmount;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createListingPrice(): number {
        return this.listingDetails.listingPrice;
    }

    // Come back to this
    protected createCreationType(): ListingCreationType {
        return ListingCreationType.MATCHED_PRE_EXISTING_RENT_CAST_DATA;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createDateListed(): Date {
        return this.listingDetails.dateListed;
    }

    // Don't want to default to anything, whatever was stored in the db for the property will remain the same
    protected createPropertyStatus(): PropertyStatus {
        return this.listingDetails.propertyStatus;
    }

    protected createRentCastSaleResponseId(): number {
        return this.listingDetails.rentCastSaleResponseId ?? this.defaultRentCastSaleResponseId;
    }

    protected createRentCastPropertyResponseId(): number {
        return this._rentCastPropertyResponseId;
    }

    protected get defaultRentCastSaleResponseId(): number {
        throw new Error('Need to have RentCastSaleResponseId');
    }


}