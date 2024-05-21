import { Country, CreateListingDetailsRequest, ListingCreationType, PropertyStatus, PropertyType, State, Utility } from "@realestatemanager/shared";
import { AbstractListingDetailsBuilder } from "./listing.details.abstract.builder";

export class ListingDetailsRequestBuilder extends AbstractListingDetailsBuilder {

    private listingDetailsRequest: CreateListingDetailsRequest;

    constructor(listingDetailsRequest: CreateListingDetailsRequest) {
        super();
        this.listingDetailsRequest = listingDetailsRequest;
    }

    protected createListingDetailsId(): number {
        return -1;
    }

    protected createAddressId(): number {
        return -1;
    }

    protected createSchoolRatingId(): number {
        return -1;
    }

    protected createPropertyDetailsId(): number {
        return -1;
    }

    protected createZillowMarketEstimatesId(): number {
        return -1;
    }

    protected createZillowURL(): string {
        const zillowUrl = this.listingDetailsRequest.zillowURL;
        if (!zillowUrl) {
            throw new Error('Must have ZillowURL');
        }
        return zillowUrl;
    }

    protected createFullAddress(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.fullAddress ?? '';
    }

    protected createState(): State {
        return this.listingDetailsRequest.propertyDetails?.address?.state; // let it be undefined
    }

    protected createzipCode(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.zipcode ?? '';
    }

    protected createCity(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.city ?? '';
    }

    protected createCounty(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.county ?? '';
    }

    protected createCountry(): Country {
        return this.listingDetailsRequest.propertyDetails?.address?.country ?? Country.UnitedStates;
    }

    protected createStreetAddress(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.streetAddress ?? '';
    }

    protected createApartmentNumber(): string {
        return this.listingDetailsRequest.propertyDetails?.address?.apartmentNumber ?? '';
    }

    protected createLongitude(): number {
        return this.listingDetailsRequest.propertyDetails?.address?.longitude ?? -1;
    }

    protected createLatitude(): number {
        return this.listingDetailsRequest.propertyDetails?.address?.latitude ?? -1;
    }

    protected createElementarySchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails?.schoolRating?.elementarySchoolRating ?? -1;
    }

    protected createMiddleSchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails?.schoolRating?.middleSchoolRating ?? -1;
    }

    protected createHighSchoolRating(): number {
        return this.listingDetailsRequest.propertyDetails?.schoolRating?.highSchoolRating ?? -1;
    }

    protected createNumberOfBedrooms(): number {
        return this.listingDetailsRequest.propertyDetails?.numberOfBedrooms ?? -1;
    }

    protected createNumberOfFullBathrooms(): number {
        return this.listingDetailsRequest.propertyDetails?.numberOfFullBathrooms ?? -1;
    }

    protected createNumberOfHalfBathrooms(): number {
        return this.listingDetailsRequest.propertyDetails?.numberOfHalfBathrooms ?? -1;
    }

    protected createSquareFeet(): number {
        return this.listingDetailsRequest.propertyDetails?.squareFeet ?? -1;
    }

    protected createAcres(): number {
        return this.listingDetailsRequest.propertyDetails?.acres ?? -1;
    }

    protected createYearBuilt(): number {
        return this.listingDetailsRequest.propertyDetails?.yearBuilt ?? -1;
    }

    protected createHasGarage(): boolean {
        return this.listingDetailsRequest.propertyDetails?.hasGarage ?? false;
    }

    protected createHasPool(): boolean {
        return this.listingDetailsRequest.propertyDetails?.hasPool ?? false;
    }

    protected createHasBasement(): boolean {
        return this.listingDetailsRequest.propertyDetails?.hasBasement ?? false;
    }

    protected createPropertyType(): PropertyType {
        return this.listingDetailsRequest.propertyDetails?.propertyType; // let it be undefined
    }

    protected createDescription(): string {
        return this.listingDetailsRequest.propertyDetails?.description ?? '';
    }

    protected createZestimate(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zestimate ?? -1;
    }

    protected createZestimateRangeLow(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zestimateRange?.low ?? -1;
    }

    protected createZestimateRangeHigh(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zestimateRange?.high ?? -1;
    }

    protected createZillowRentEstimate(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zillowRentEstimate ?? -1;
    }

    protected createZillowMonthlyPropertyTaxAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zillowMonthlyPropertyTaxAmount ?? -1;
    }

    protected createZillowMonthlyHomeInsuranceAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zillowMonthlyHomeInsuranceAmount ?? -1;
    }

    protected createZillowMonthlyHOAFeesAmount(): number {
        return this.listingDetailsRequest.zillowMarketEstimates?.zillowMonthlyHOAFeesAmount ?? -1;
    }

    protected createListingPrice(): number {
        console.log("Listing Price is:", (this.listingDetailsRequest?.listingPrice ?? -1));
        return this.listingDetailsRequest?.listingPrice ?? -1;
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
        return this.listingDetailsRequest.propertyStatus; // let it be undefined
    }


}