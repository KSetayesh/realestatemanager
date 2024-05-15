import { Country, ListingDetailsDTO, PropertyStatus, PropertyType, State, Utility } from "@realestatemanager/shared";
import { ListingDetails } from "../models/listing_models/listingdetails.model";
import { RentCastPropertyResponseType, RentCastSaleResponseType } from "../services/rentcast.service";
import { convertSquareFeetToAcres } from "src/shared/Constants";

export class ListingDetailsDTOBuilder {

    private rentCastSalesResponseTyped: RentCastSaleResponseType;
    private rentCastPropertyTyped?: RentCastPropertyResponseType;
    private listingDetails?: ListingDetails;

    constructor(
        rentCastSalesResponseTyped: RentCastSaleResponseType,
        rentCastPropertyTyped?: RentCastPropertyResponseType,
        listingDetails?: ListingDetails,
    ) {
        this.rentCastSalesResponseTyped = rentCastSalesResponseTyped;
        this.rentCastPropertyTyped = rentCastPropertyTyped;
        this.listingDetails = listingDetails;
    }

    build(): ListingDetailsDTO {

        const listingDetail: ListingDetailsDTO = {
            zillowURL: this.createZillowURL(),
            propertyDetails: {
                address: {
                    fullAddress: this.createFullAddress(),
                    state: this.createState(),
                    zipcode: this.createzipCode(),
                    city: this.createCity(),
                    county: this.createCounty(),
                    country: this.createCountry(),
                    streetAddress: this.createStreetAddress(),
                    apartmentNumber: this.createApartmentNumber(),
                    longitude: this.createLongitude(),
                    latitude: this.createLatitude(),
                },
                schoolRating: {
                    elementarySchoolRating: this.createElementarySchoolRating(),
                    middleSchoolRating: this.createMiddleSchoolRating(),
                    highSchoolRating: this.createHighSchoolRating(),
                },
                numberOfBedrooms: this.createNumberOfBedrooms(),
                numberOfFullBathrooms: this.createNumberOfFullBathrooms(),
                numberOfHalfBathrooms: this.createNumberOfHalfBathrooms(),
                squareFeet: this.createSquareFeet(),
                acres: this.createAcres(),
                yearBuilt: this.createYearBuilt(),
                hasGarage: this.createHasGarage(),
                hasPool: this.createHasPool(),
                hasBasement: this.createHasBasement(),
                propertyType: this.createPropertyType(),
                description: this.createDescription(),
            },
            zillowMarketEstimates: {
                zestimate: this.createZestimate(),
                zestimateRange: {
                    low: this.createZestimateRangeLow(),
                    high: this.createZestimateRangeHigh(),
                },
                zillowRentEstimate: this.createZillowRentEstimate(),
                zillowMonthlyPropertyTaxAmount: this.createZillowMonthlyPropertyTaxAmount(),
                zillowMonthlyHomeInsuranceAmount: this.createZillowMonthlyHomeInsuranceAmount(),
                zillowMonthlyHOAFeesAmount: this.createZillowMonthlyHOAFeesAmount(),
            },
            listingPrice: this.createListingPrice(),
            dateListed: this.createDateListed(), // Need to come back and fix this function
            numberOfDaysOnMarket: this.createDaysOnMarket(),
            propertyStatus: this.createPropertyStatus(),
        };

        console.log("listingDetails:", listingDetail);

        return listingDetail;
    }

    private createZillowURL(): string {
        return this.listingDetails?.zillowURL ??
            `NEED TO UPDATE_${this.rentCastSalesResponseTyped.id}`;
    }

    private createFullAddress(): string {
        return this.listingDetails?.fullAddress ??
            this.rentCastSalesResponseTyped.formattedAddress ??
            this.rentCastPropertyTyped?.formattedAddress ?? '';
    }

    private createState(): State {
        return this.listingDetails?.state ??
            this.rentCastSalesResponseTyped.state ??
            this.rentCastPropertyTyped?.state; // let it be undefined
    }

    private createzipCode(): string {
        return this.listingDetails?.zipcode ??
            this.rentCastSalesResponseTyped.zipCode ??
            this.rentCastPropertyTyped?.zipCode ?? '';
    }

    private createCity(): string {
        return this.listingDetails?.city ??
            this.rentCastSalesResponseTyped.city ??
            this.rentCastPropertyTyped?.city ?? '';
    }

    private createCounty(): string {
        return this.listingDetails?.county ??
            this.rentCastSalesResponseTyped.county ??
            this.rentCastPropertyTyped?.county ?? '';
    }

    private createCountry(): Country {
        return Country.UnitedStates;
    }

    private createStreetAddress(): string {
        return this.listingDetails?.streetAddress ??
            this.rentCastSalesResponseTyped.addressLine1 ??
            this.rentCastPropertyTyped?.addressLine1 ?? '';
    }

    private createApartmentNumber(): string {
        return this.listingDetails?.apartmentNumber ??
            this.rentCastSalesResponseTyped.addressLine2 ??
            this.rentCastPropertyTyped?.addressLine2 ?? '';
    }

    private createLongitude(): number {
        return this.listingDetails?.longitude ??
            this.rentCastSalesResponseTyped.longitude ??
            this.rentCastPropertyTyped?.longitude ?? -1;
    }

    private createLatitude(): number {
        return this.listingDetails?.latitude ??
            this.rentCastSalesResponseTyped.latitude ??
            this.rentCastPropertyTyped?.latitude ?? -1;
    }

    private createElementarySchoolRating(): number {
        return this.listingDetails?.elementarySchoolRating ?? -1;
    }

    private createMiddleSchoolRating(): number {
        return this.listingDetails?.middleSchoolRating ?? -1;
    }

    private createHighSchoolRating(): number {
        return this.listingDetails?.highSchoolRating ?? -1;
    }

    private createNumberOfBedrooms(): number {
        return this.listingDetails?.numberOfBedrooms ??
            this.rentCastSalesResponseTyped.bedrooms ??
            this.rentCastPropertyTyped?.bedrooms ?? -1;
    }

    private createNumberOfFullBathrooms(): number {
        const numberOfBathrooms = this.listingDetails?.numberOfFullBathrooms ??
            this.rentCastSalesResponseTyped.bathrooms ??
            this.rentCastPropertyTyped?.bathrooms ?? -1;
        return Math.floor(numberOfBathrooms);
    }

    private createNumberOfHalfBathrooms(): number {
        return this.listingDetails?.numberOfHalfBathrooms ??
            (Utility.isDecimal(this.rentCastSalesResponseTyped.bathrooms ??
                this.rentCastPropertyTyped?.bathrooms ?? -1) ? 1 : 0);
    }

    private createSquareFeet(): number {
        return this.listingDetails?.squareFeet ??
            this.rentCastSalesResponseTyped.squareFootage ??
            this.rentCastPropertyTyped?.squareFootage ?? -1;
    }

    private createAcres(): number {
        const lotSize = this.rentCastSalesResponseTyped.lotSize ??
            this.rentCastPropertyTyped?.lotSize;

        return this.listingDetails?.acres ?? (lotSize ? convertSquareFeetToAcres(lotSize) : -1);
    }

    private createYearBuilt(): number {
        return this.listingDetails?.yearBuilt ??
            this.rentCastSalesResponseTyped.yearBuilt ??
            this.rentCastPropertyTyped?.yearBuilt ?? -1;
    }

    private createHasGarage(): boolean {
        return this.listingDetails?.hasGarage ??
            this.rentCastPropertyTyped?.features?.garage ?? false;
    }

    private createHasPool(): boolean {
        return this.listingDetails?.hasPool ??
            this.rentCastPropertyTyped?.features?.pool ?? false;
    }

    private createHasBasement(): boolean {
        return this.listingDetails?.hasBasement ?? false;
    }

    private createPropertyType(): PropertyType {
        return this.listingDetails?.propertyType ??
            this.rentCastSalesResponseTyped.propertyType ??
            this.rentCastPropertyTyped?.propertyType; // Let it be undefined
    }

    private createDescription(): string {
        return this.listingDetails?.description ?? '';
    }

    private createZestimate(): number {
        return this.listingDetails?.zestimate ?? -1;
    }

    private createZestimateRangeLow(): number {
        return this.listingDetails?.zestimateRangeLow ?? -1;
    }

    private createZestimateRangeHigh(): number {
        return this.listingDetails?.zestimateRangeHigh ?? -1;
    }

    private createZillowRentEstimate(): number {
        return this.listingDetails?.zillowRentEstimate ?? -1;
    }

    private createZillowMonthlyPropertyTaxAmount(): number {
        let propertyTax = -1;
        if (this.rentCastPropertyTyped && this.rentCastPropertyTyped.previousYearPropertyTaxes > -1) {
            propertyTax = Utility.round(this.rentCastPropertyTyped.previousYearPropertyTaxes / 12);
        }

        return this.listingDetails?.zillowMonthlyPropertyTaxAmount ?? propertyTax;
    }

    private createZillowMonthlyHomeInsuranceAmount(): number {
        return this.listingDetails?.zillowMonthlyHomeInsuranceAmount ?? -1;
    }

    private createZillowMonthlyHOAFeesAmount(): number {
        return this.listingDetails?.zillowMonthlyHOAFeesAmount ?? -1;
    }

    private createListingPrice(): number {
        return this.listingDetails?.listingPrice ??
            this.rentCastSalesResponseTyped.price ?? -1;
    }

    private createDateListed(): string {
        const daysOnMarket = this.createDaysOnMarket();
        const listedDate = this.rentCastSalesResponseTyped.listedDate ?? Utility.getDateNDaysAgo(daysOnMarket);

        // Need to figure out what to do with below code
        // return this.listingDetails?.dateListed ?? listedDate;
        return listedDate;
    }

    private createDaysOnMarket(): number {
        return this.rentCastSalesResponseTyped.daysOnMarket ?? 0;
    }

    private createPropertyStatus(): PropertyStatus {
        return this.listingDetails?.propertyStatus ??
            this.rentCastSalesResponseTyped.status;
    }


}