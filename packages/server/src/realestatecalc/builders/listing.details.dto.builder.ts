import { Country, ListingDetailsDTO, State, Utility } from "@realestatemanager/shared";
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

        const daysOnMarket = this.rentCastSalesResponseTyped.daysOnMarket ?? 0;
        const listedDate = this.rentCastSalesResponseTyped.listedDate ?? Utility.getDateNDaysAgo(daysOnMarket);
        const numberOfBathrooms = this.rentCastSalesResponseTyped.bathrooms ?? this.rentCastPropertyTyped?.bathrooms ?? -1;
        const numberOfFullBathrooms = Math.floor(numberOfBathrooms);
        const numberOfHalfBathrooms = Utility.isDecimal(numberOfBathrooms) ? 1 : 0;
        const lotSize = this.rentCastSalesResponseTyped.lotSize ?? this.rentCastPropertyTyped?.lotSize;
        const acres = lotSize ? convertSquareFeetToAcres(lotSize) : -1;
        let propertyTax = -1;
        if (this.rentCastPropertyTyped && this.rentCastPropertyTyped.previousYearPropertyTaxes > -1) {
            propertyTax = Utility.round(this.rentCastPropertyTyped.previousYearPropertyTaxes / 12);
        }

        const listingDetail: ListingDetailsDTO = {
            zillowURL: `NEED TO UPDATE_${this.rentCastSalesResponseTyped.id}`,
            propertyDetails: {
                address: {
                    fullAddress: this.rentCastSalesResponseTyped.formattedAddress ?? this.rentCastPropertyTyped?.formattedAddress ?? '',
                    state: this.rentCastSalesResponseTyped.state ?? this.rentCastPropertyTyped?.state, // Let it be undefined
                    zipcode: this.rentCastSalesResponseTyped.zipCode ?? this.rentCastPropertyTyped?.zipCode ?? '',
                    city: this.rentCastSalesResponseTyped.city ?? this.rentCastPropertyTyped?.city ?? '',
                    county: this.rentCastSalesResponseTyped.county ?? this.rentCastPropertyTyped?.county ?? '',
                    country: Country.UnitedStates,
                    streetAddress: this.rentCastSalesResponseTyped.addressLine1 ?? this.rentCastPropertyTyped?.addressLine1 ?? '',
                    apartmentNumber: this.rentCastSalesResponseTyped.addressLine2 ?? this.rentCastPropertyTyped?.addressLine2 ?? '',
                    longitude: this.rentCastSalesResponseTyped.longitude ?? this.rentCastPropertyTyped?.longitude ?? -1,
                    latitude: this.rentCastSalesResponseTyped.latitude ?? this.rentCastPropertyTyped?.latitude ?? -1,
                },
                schoolRating: {
                    elementarySchoolRating: -1,
                    middleSchoolRating: -1,
                    highSchoolRating: -1,
                },
                numberOfBedrooms: this.rentCastSalesResponseTyped.bedrooms ?? this.rentCastPropertyTyped?.bedrooms ?? -1,
                numberOfFullBathrooms: numberOfFullBathrooms,
                numberOfHalfBathrooms: numberOfHalfBathrooms,
                squareFeet: this.rentCastSalesResponseTyped.squareFootage ?? this.rentCastPropertyTyped?.squareFootage ?? -1,
                acres: acres,
                yearBuilt: this.rentCastSalesResponseTyped.yearBuilt ?? this.rentCastPropertyTyped?.yearBuilt ?? -1,
                hasGarage: this.rentCastPropertyTyped?.features?.garage ?? false,
                hasPool: this.rentCastPropertyTyped?.features?.pool ?? false,
                hasBasement: false, // No info here
                propertyType: this.rentCastSalesResponseTyped.propertyType ?? this.rentCastPropertyTyped?.propertyType, // Let it be undefined
                description: '',
            },
            zillowMarketEstimates: {
                zestimate: -1,
                zestimateRange: {
                    low: -1,
                    high: -1,
                },
                zillowRentEstimate: -1,
                zillowMonthlyPropertyTaxAmount: propertyTax,
                zillowMonthlyHomeInsuranceAmount: -1,
                zillowMonthlyHOAFeesAmount: -1,
            },
            listingPrice: this.rentCastSalesResponseTyped.price ?? -1,
            dateListed: listedDate,
            numberOfDaysOnMarket: daysOnMarket,
            propertyStatus: this.rentCastSalesResponseTyped.status, // Let it be undefined
        };

        console.log("listingDetails:", listingDetail);

        return listingDetail;
    }

    private createZillowURL(): string {
        return '';
    }

    private createState(): string {
        return '';
    }

    private createzipCode(): string {
        return '';
    }

    private createCity(): string {
        return '';
    }

    private createCounty(): string {
        return '';
    }

    private createCountry(): string {
        return '';
    }

    private createStreetAddress(): string {
        return '';
    }

    private createApartmentNumber(): string {
        return '';
    }

    private createLongitude(): number {
        return -1;
    }

    private createLatitude(): number {
        return -1;
    }

    private createElementarySchoolRating(): number {
        return -1;
    }

    private createMiddleSchoolRating(): number {
        return -1;
    }

    private createHighSchoolRating(): number {
        return -1;
    }

    private createNumberOfBedrooms(): number {
        return -1;
    }

    private createNumberOfFullBathrooms(): number {
        return -1;
    }

    private createNumberOfHalfBathrooms(): number {
        return -1;
    }

    private createSquareFeet(): number {
        return -1;
    }

    private createAcres(): number {
        return -1;
    }

    private createYearBuilt(): number {
        return -1;
    }

    private createHasGarage(): boolean {
        return false;
    }

    private createHasPool(): boolean {
        return false;
    }

    private createHasBasement(): boolean {
        return false;
    }

    private createPropertyType(): string {
        return '';
    }

    private createDescription(): string {
        return '';
    }

    private createZestimate(): number {
        return -1;
    }

    private createZestimateRangeLow(): number {
        return -1;
    }

    private createZestimateRangeHigh(): number {
        return -1;
    }

    private createZillowRentEstimate(): number {
        return -1;
    }

    private createZillowMonthlyPropertyTaxAmount(): number {
        return -1;
    }

    private createZillowMonthlyHomeInsuranceAmount(): number {
        return -1;
    }

    private createZillowMonthlyHOAFeesAmount(): number {
        return -1;
    }

    private createListingPrice(): number {
        return -1;
    }

    private createDateListed(): string {
        return '';
    }

    private createDaysOnMarket(): number {
        return 0;
    }

    private createPropertyStatus(): string {
        return '';
    }


}