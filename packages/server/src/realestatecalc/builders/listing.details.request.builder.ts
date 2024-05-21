import { Country, CreateListingDetailsRequest, ListingCreationType, PropertyStatus, PropertyType, State, Utility } from "@realestatemanager/shared";
import { AbstractListingDetailsBuilder } from "./listing.details.abstract.builder";

export class ListingDetailsRequestBuilder extends AbstractListingDetailsBuilder {

    private listingDetailsRequest: CreateListingDetailsRequest;

    constructor(listingDetailsRequest: CreateListingDetailsRequest) {
        super();
        this.listingDetailsRequest = listingDetailsRequest;
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
        const zillowUrl = this.listingDetailsRequest.zillowURL;
        if (zillowUrl) {
            return zillowUrl;
        }
        return this.defaultZillowURL;
    }

    protected createFullAddress(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.fullAddress ?? this.defaultFullAddress;
    }

    protected createState(): State {
        return this.listingDetailsRequest.propertyDetails?.address?.state ?? this.defaultState;
    }

    protected createZipCode(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.zipcode ?? this.defaultZipCode;
    }

    protected createCity(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.city ?? this.defaultCity;
    }

    protected createCounty(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.county ?? this.defaultCounty;
    }

    protected createCountry(): Country {
        return this.listingDetailsRequest.propertyDetails?.address?.country ?? this.defaultCountry;
    }

    protected createStreetAddress(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.streetAddress ?? this.defaultStreetAddress;
    }

    protected createApartmentNumber(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.apartmentNumber ?? this.defaultApartmentNumber;
    }

    protected createLongitude(): number {
        return this.listingDetailsRequest.propertyDetails?.address?.longitude ?? this.defaultLongitude;
    }

    protected createLatitude(): number {
        return this.listingDetailsRequest.propertyDetails?.address?.latitude ?? this.defaultLatitude;
    }

    protected createElementarySchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails?.schoolRating?.elementarySchoolRating ?? this.defaultElementarySchoolRating;
    }

    protected createMiddleSchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails?.schoolRating?.middleSchoolRating ?? this.defaultMiddleSchoolRating;
    }

    protected createHighSchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails?.schoolRating?.highSchoolRating ?? this.defaultHighSchoolRating;
    }

    protected createNumberOfBedrooms(): number {
        return this.listingDetailsRequest.propertyDetails?.numberOfBedrooms ?? this.defaultNumberOfBedrooms;
    }

    protected createNumberOfFullBathrooms(): number {
        return this.listingDetailsRequest.propertyDetails?.numberOfFullBathrooms ?? this.defaultNumberOfFullBathrooms;
    }

    protected createNumberOfHalfBathrooms(): number {
        return this.listingDetailsRequest.propertyDetails?.numberOfHalfBathrooms ?? this.defaultNumberOfHalfBathrooms;
    }

    protected createSquareFeet(): number {
        return this.listingDetailsRequest.propertyDetails?.squareFeet ?? this.defaultSquareFeet;
    }

    protected createAcres(): number {
        return this.listingDetailsRequest.propertyDetails?.acres ?? this.defaultAcres;
    }

    protected createYearBuilt(): number {
        return this.listingDetailsRequest.propertyDetails?.yearBuilt ?? this.defaultYearBuilt;
    }

    protected createHasGarage(): boolean {
        return this.listingDetailsRequest.propertyDetails?.hasGarage ?? this.defaultHasGarage;
    }

    protected createHasPool(): boolean {
        return this.listingDetailsRequest.propertyDetails?.hasPool ?? this.defaultHasPool;
    }

    protected createHasBasement(): boolean {
        return this.listingDetailsRequest.propertyDetails?.hasBasement ?? this.defaultHasBasement;
    }

    protected createPropertyType(): PropertyType {
        return this.listingDetailsRequest.propertyDetails?.propertyType ?? this.defaultPropertyType;
    }

    protected createDescription(): string {
        return this.listingDetailsRequest.propertyDetails?.description ?? this.defaultDescription;
    }

    protected createZestimate(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zestimate ?? this.defaultZestimate;
    }

    protected createZestimateRangeLow(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zestimateRange?.low ?? this.defaultZestimateRangeLow;
    }

    protected createZestimateRangeHigh(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zestimateRange?.high ?? this.defaultZestimateRangeHigh;
    }

    protected createZillowRentEstimate(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zillowRentEstimate ?? this.defaultZillowRentEstimate;
    }

    protected createZillowMonthlyPropertyTaxAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zillowMonthlyPropertyTaxAmount ?? this.defaultZillowMonthlyPropertyTaxAmount;
    }

    protected createZillowMonthlyHomeInsuranceAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zillowMonthlyHomeInsuranceAmount ?? this.defaultZillowMonthlyHomeInsuranceAmount;
    }

    protected createZillowMonthlyHOAFeesAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zillowMonthlyHOAFeesAmount ?? this.defaultZillowMonthlyHOAFeesAmount;
    }

    protected createListingPrice(): number {
        return this.listingDetailsRequest.listingPrice ?? this.defaultListingPrice;
    }

    // Come back to this
    protected createCreationType(): ListingCreationType {
        return ListingCreationType.MANUAL;
    }

    protected createDateListed(): Date {
        const numberOfDaysOnMarket = this.listingDetailsRequest.numberOfDaysOnMarket ?? 0;

        if (numberOfDaysOnMarket) {
            const listedDate = Utility.getDateNDaysAgo(numberOfDaysOnMarket);
            return new Date(listedDate); // Come back to this and make sure the string is being parsed correctly
        }

        return this.defaultDateListed;
    }

    protected createPropertyStatus(): PropertyStatus {
        return this.listingDetailsRequest.propertyStatus ?? this.defaultPropertyStatus;
    }

    protected createRentCastSaleResponseId(): number {
        return this.defaultRentCastSaleResponseId;
    }

    protected createRentCastPropertyResponseId(): number {
        return this.defaultRentCastPropertyResponseId;
    }

}