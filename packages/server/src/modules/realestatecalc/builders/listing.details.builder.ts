import {
    Country,
    ListingCreationType,
    PropertyStatus,
    PropertyType,
    State,
    Utility
} from "@realestatemanager/shared";
import { RentCastPropertyResponseType, RentCastSaleResponseType } from "../services/rentcast.service";
import { convertSquareFeetToAcres } from "src/shared/Constants";
import { AbstractListingDetailsBuilder } from "./listing.details.abstract.builder";

export class ListingDetailsBuilder extends AbstractListingDetailsBuilder {

    private rentCastSalesResponseType: RentCastSaleResponseType;
    private _rentCastSalesResponseId: number;
    private rentCastPropertyType?: RentCastPropertyResponseType;
    private _rentCastPropertyResponseId?: number;

    constructor(
        rentCastSalesResponseType: RentCastSaleResponseType,
        rentCastSalesResponseId: number,
        rentCastPropertyType?: RentCastPropertyResponseType,
        rentCastPropertyResponseId?: number,
    ) {
        super();
        this.rentCastSalesResponseType = rentCastSalesResponseType;
        this._rentCastSalesResponseId = rentCastSalesResponseId;
        this.rentCastPropertyType = rentCastPropertyType;
        this._rentCastPropertyResponseId = rentCastPropertyResponseId;
    }

    protected get defaultZillowURL(): string {
        return `NEED TO UPDATE_${this.rentCastSalesResponseType.id}`;
    }

    protected createListingDetailsId(): number {
        return this.defaultListingDetailsId;
    }

    protected createAddressId(): number {
        return this.defaultAddressId;
    }

    protected createSchoolRatingId(): number {
        return this.defaultSchoolRatingId;
    }

    protected createPropertyDetailsId(): number {
        return this.defaultPropertyDetailsId;
    }

    protected createZillowMarketEstimatesId(): number {
        return this.defaultZillowMarketEstimatesId;
    }

    protected createZillowURL(): string {
        return this.defaultZillowURL;
    }

    protected createFullAddress(): string {
        return this.rentCastSalesResponseType.formattedAddress ??
            this.rentCastPropertyType?.formattedAddress ?? this.defaultFullAddress;
    }

    protected createState(): State {
        return Utility.getEnumValue(State, this.rentCastSalesResponseType.state) ??
            Utility.getEnumValue(State, this.rentCastPropertyType?.state) ?? this.defaultState;
    }

    protected createZipCode(): string {
        return this.rentCastSalesResponseType.zipCode ??
            this.rentCastPropertyType?.zipCode ?? this.defaultZipCode;
    }

    protected createCity(): string {
        return this.rentCastSalesResponseType.city ??
            this.rentCastPropertyType?.city ?? this.defaultCity;
    }

    protected createCounty(): string {
        return this.rentCastSalesResponseType.county ??
            this.rentCastPropertyType?.county ?? this.defaultCounty;
    }

    protected createCountry(): Country {
        return this.defaultCountry;
    }

    protected createStreetAddress(): string {
        return this.rentCastSalesResponseType.addressLine1 ??
            this.rentCastPropertyType?.addressLine1 ?? this.defaultStreetAddress;
    }

    protected createApartmentNumber(): string {
        return this.rentCastSalesResponseType.addressLine2 ??
            this.rentCastPropertyType?.addressLine2 ?? this.defaultApartmentNumber;
    }

    protected createLongitude(): number {
        return this.rentCastSalesResponseType.longitude ??
            this.rentCastPropertyType?.longitude ?? this.defaultLongitude;
    }

    protected createLatitude(): number {
        return this.rentCastSalesResponseType.latitude ??
            this.rentCastPropertyType?.latitude ?? this.defaultLatitude;
    }

    protected createElementarySchoolRating(): number {
        return this.defaultElementarySchoolRating;
    }

    protected createMiddleSchoolRating(): number {
        return this.defaultMiddleSchoolRating;
    }

    protected createHighSchoolRating(): number {
        return this.defaultHighSchoolRating;
    }

    protected createNumberOfBedrooms(): number {
        return this.rentCastSalesResponseType.bedrooms ??
            this.rentCastPropertyType?.bedrooms ?? this.defaultNumberOfBedrooms;
    }

    protected createNumberOfFullBathrooms(): number {
        const numberOfBathrooms = this.rentCastSalesResponseType.bathrooms ??
            this.rentCastPropertyType?.bathrooms ?? this.defaultNumberOfFullBathrooms;
        return Math.floor(numberOfBathrooms);
    }

    protected createNumberOfHalfBathrooms(): number {
        return (Utility.isDecimal(this.rentCastSalesResponseType.bathrooms ??
            this.rentCastPropertyType?.bathrooms ?? this.defaultNumberOfHalfBathrooms) ? 1 : 0);
    }

    protected createSquareFeet(): number {
        return this.rentCastSalesResponseType.squareFootage ??
            this.rentCastPropertyType?.squareFootage ?? this.defaultSquareFeet;
    }

    protected createAcres(): number {
        const lotSize = this.rentCastSalesResponseType.lotSize ?? this.rentCastPropertyType?.lotSize;

        return (lotSize ?? this.defaultAcres) !== this.defaultAcres ? convertSquareFeetToAcres(lotSize) : this.defaultAcres;
    }


    protected createYearBuilt(): number {
        return this.rentCastSalesResponseType.yearBuilt ??
            this.rentCastPropertyType?.yearBuilt ?? this.defaultYearBuilt;
    }

    protected createHasGarage(): boolean {
        return this.rentCastPropertyType?.features?.garage ?? this.defaultHasGarage;
    }

    protected createHasPool(): boolean {
        return this.rentCastPropertyType?.features?.pool ?? this.defaultHasPool;
    }

    protected createHasBasement(): boolean {
        return this.defaultHasBasement;
    }

    protected createPropertyType(): PropertyType {
        return this.rentCastSalesResponseType.propertyType ??
            this.rentCastPropertyType?.propertyType ?? this.defaultPropertyType;
    }

    protected createDescription(): string {
        return this.defaultDescription;
    }

    protected createZestimate(): number {
        return this.defaultZestimate;
    }

    protected createZestimateRangeLow(): number {
        return this.defaultZestimateRangeLow;
    }

    protected createZestimateRangeHigh(): number {
        return this.defaultZestimateRangeHigh;
    }

    protected createZillowRentEstimate(): number {
        return this.defaultZillowRentEstimate;
    }

    protected createZillowMonthlyPropertyTaxAmount(): number {
        if (this.rentCastPropertyType?.previousYearPropertyTaxes > -1) {
            return Utility.round(this.rentCastPropertyType.previousYearPropertyTaxes / 12);
        }

        return this.defaultZillowMonthlyPropertyTaxAmount;
    }

    protected createZillowMonthlyHomeInsuranceAmount(): number {
        return this.defaultZillowMonthlyHomeInsuranceAmount;
    }

    protected createZillowMonthlyHOAFeesAmount(): number {
        return this.defaultZillowMonthlyHOAFeesAmount;
    }

    protected createListingPrice(): number {
        return this.rentCastSalesResponseType.price ?? this.defaultListingPrice;
    }

    // Come back to this and make sure its the right type
    protected createCreationType(): ListingCreationType {
        return ListingCreationType.MATCHED_PRE_EXISTING_RENT_CAST_DATA;
    }

    protected createDateListed(): Date {
        const numberOfDaysOnMarket = this.rentCastSalesResponseType.daysOnMarket ?? 0;

        if (numberOfDaysOnMarket) {
            const listedDate = Utility.getDateNDaysAgo(numberOfDaysOnMarket);
            return new Date(listedDate); // Come back to this and make sure the string is being parsed correctly
        }

        return this.defaultDateListed;
    }

    protected createPropertyStatus(): PropertyStatus {
        return this.rentCastSalesResponseType.status ?? this.defaultPropertyStatus;
    }

    protected createRentCastSaleResponseId(): number {
        return this._rentCastSalesResponseId ?? this.defaultRentCastSaleResponseId;
    }

    protected createRentCastPropertyResponseId(): number {
        return this._rentCastPropertyResponseId ?? this.defaultRentCastPropertyResponseId;
    }

    protected get defaultRentCastSaleResponseId(): number {
        throw new Error('Need to have RentCastSaleResponseId');
    }

}