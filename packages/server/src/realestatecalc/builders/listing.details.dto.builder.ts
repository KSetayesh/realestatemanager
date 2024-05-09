import { Country, ListingDetailsDTO, PropertyStatus, PropertyType, State, Utility } from "@realestatemanager/shared";
import { RentCastResponse } from "../models/rent_cast_api_models/rentcastresponse.model";
import { convertSquareFeetToAcres } from "src/shared/Constants";

type RentCastSaleResponseType = {
    id: string;
    formattedAddress: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: State;
    zipCode: string;
    county: Country;
    bedrooms: number;
    bathrooms: number;
    latitude: number;
    longitude: number;
    squareFootage: number;
    propertyType: PropertyType;
    lotSize: number;
    status: PropertyStatus;
    yearBuilt: number;
    price: number;
    listedDate: string;
    removedDate: string;
    createdDate: string;
    lastSeenDate: string;
    daysOnMarket: number;
};

type RentCastPropertyResponseType = {
    id: string;
    formattedAddress: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: State;
    zipCode: string;
    county: Country;
    bedrooms: number;
    bathrooms: number;
    latitude: number;
    longitude: number;
    squareFootage: number;
    propertyType: PropertyType;
    lotSize: number;
    yearBuilt: number;
    assessorID: string;
    lastSalePrice: number;
    lastSaleDate: Date;
    ownerOccupied: boolean;
    features: {
        garage: boolean;
        pool: boolean;
        floorCount: number;
        unitCount: number;
    };
    previousYearPropertyTaxes: number;
    owner: {
        names: string[];
        mailingAddress: {
            id: string;
            formattedAddress: string;
            addressLine1: string;
            addressLine2: string;
            city: string;
            state: State;
            zipCode: string;
        };
    };
};

export class ListingDetailsDTOBuilder {

    private rentCastSalesResponses: RentCastResponse[];
    private rentCastPropertyResponses: RentCastResponse[];

    constructor(
        rentCastSalesResponses: RentCastResponse[],
        rentCastPropertyResponses: RentCastResponse[]
    ) {
        this.rentCastPropertyResponses = rentCastSalesResponses;
        this.rentCastPropertyResponses = rentCastPropertyResponses;
    }

    build(): ListingDetailsDTO[] {
        const listingDetailsDTOList: ListingDetailsDTO[] = [];
        const rentCastPropertyResponseMap: Map<string, RentCastPropertyResponseType> = this.createRentCastPropertyResponseTypeMap();
        for (const rentCastSalesResponse of this.rentCastSalesResponses) {
            const rentCastSalesResponseTyped: RentCastSaleResponseType = this.createRentCastSaleResponseType(rentCastSalesResponse);
            const id = rentCastSalesResponseTyped.id;

            /* 
                Purposely not checking for id in map, 
                if it doesnt exist we will simply pass in undefined into the buildListingDetailsDTO function
            */
            const rentCastPropertyTyped: RentCastPropertyResponseType = rentCastPropertyResponseMap.get(id);
            const listingDetailsDTO: ListingDetailsDTO =
                this.buildListingDetailsDTO(rentCastSalesResponseTyped, rentCastPropertyTyped);
            listingDetailsDTOList.push(listingDetailsDTO);

        }
        return listingDetailsDTOList;
    }

    private createRentCastPropertyResponseTypeMap(): Map<string, RentCastPropertyResponseType> {
        const rentCastPropertyResponseMap = new Map<string, RentCastPropertyResponseType>();
        for (const rentCastPropertyResponse of this.rentCastPropertyResponses) {
            const rentCastPropertyResponseTyped: RentCastPropertyResponseType =
                this.createRentCastPropertyResponseType(rentCastPropertyResponse);
            const id = rentCastPropertyResponseTyped.id;
            if (!(id in rentCastPropertyResponseMap)) {
                rentCastPropertyResponseMap.set(id, rentCastPropertyResponseTyped);
            }
        }
        return rentCastPropertyResponseMap;
    }

    // TO-DO
    private buildListingDetailsDTO(
        rentCastSalesResponseTyped: RentCastSaleResponseType,
        rentCastPropertyTyped?: RentCastPropertyResponseType,
    ): ListingDetailsDTO {

        const daysOnMarket = rentCastSalesResponseTyped.daysOnMarket ?? 0;
        const listedDate = rentCastSalesResponseTyped.listedDate ?? Utility.getDateNDaysAgo(daysOnMarket);
        const numberOfBathrooms = rentCastSalesResponseTyped.bathrooms ?? rentCastPropertyTyped?.bathrooms ?? -1;
        const numberOfFullBathrooms = Math.floor(numberOfBathrooms);
        const numberOfHalfBathrooms = Utility.isDecimal(numberOfBathrooms) ? 1 : 0;
        const lotSize = rentCastSalesResponseTyped.lotSize ?? rentCastPropertyTyped?.lotSize;
        const acres = lotSize ? convertSquareFeetToAcres(lotSize) : -1;

        const listingDetail: ListingDetailsDTO = {
            zillowURL: `NEED TO UPDATE_${rentCastSalesResponseTyped.id}`,
            propertyDetails: {
                address: {
                    fullAddress: rentCastSalesResponseTyped.formattedAddress ?? rentCastPropertyTyped?.formattedAddress ?? '',
                    state: rentCastSalesResponseTyped.state ?? rentCastPropertyTyped?.state, // Let it be undefined
                    zipcode: rentCastSalesResponseTyped.zipCode ?? rentCastPropertyTyped?.zipCode ?? '',
                    city: rentCastSalesResponseTyped.city ?? rentCastPropertyTyped?.city ?? '',
                    county: rentCastSalesResponseTyped.county ?? rentCastPropertyTyped?.county ?? '',
                    country: Country.UnitedStates,
                    streetAddress: rentCastSalesResponseTyped.addressLine1 ?? rentCastPropertyTyped?.addressLine1 ?? '',
                    apartmentNumber: rentCastSalesResponseTyped.addressLine2 ?? rentCastPropertyTyped?.addressLine2 ?? '',
                    longitude: rentCastSalesResponseTyped.longitude ?? rentCastPropertyTyped?.longitude ?? -1,
                    latitude: rentCastSalesResponseTyped.latitude ?? rentCastPropertyTyped?.latitude ?? -1,
                },
                schoolRating: {
                    elementarySchoolRating: -1,
                    middleSchoolRating: -1,
                    highSchoolRating: -1,
                },
                numberOfBedrooms: rentCastSalesResponseTyped.bedrooms ?? rentCastPropertyTyped?.bedrooms ?? -1,
                numberOfFullBathrooms: numberOfFullBathrooms,
                numberOfHalfBathrooms: numberOfHalfBathrooms,
                squareFeet: rentCastSalesResponseTyped.squareFootage ?? rentCastPropertyTyped?.squareFootage ?? -1,
                acres: acres,
                yearBuilt: rentCastSalesResponseTyped.yearBuilt ?? rentCastPropertyTyped?.yearBuilt ?? -1,
                hasGarage: rentCastPropertyTyped?.features?.garage ?? false,
                hasPool: rentCastPropertyTyped?.features?.pool ?? false,
                hasBasement: false, // No info here
                propertyType: rentCastSalesResponseTyped.propertyType ?? rentCastPropertyTyped?.propertyType, // Let it be undefined
                description: '',
            },
            zillowMarketEstimates: {
                zestimate: -1,
                zestimateRange: {
                    low: -1,
                    high: -1,
                },
                zillowRentEstimate: -1,
                zillowMonthlyPropertyTaxAmount: Utility.round((rentCastPropertyTyped?.previousYearPropertyTaxes / 12) ?? -1),
                zillowMonthlyHomeInsuranceAmount: -1,
                zillowMonthlyHOAFeesAmount: -1,
            },
            listingPrice: rentCastSalesResponseTyped.price ?? -1,
            dateListed: listedDate,
            numberOfDaysOnMarket: daysOnMarket,
            propertyStatus: rentCastSalesResponseTyped.status, // Let it be undefined
        };

        return listingDetail;
    }

    private createRentCastSaleResponseType(rentCastSalesResponse: RentCastResponse): RentCastSaleResponseType {
        const jsonData = rentCastSalesResponse.apiResponseData;
        return {
            id: rentCastSalesResponse.id,
            formattedAddress: jsonData.formattedAddress ?? '',
            addressLine1: jsonData.addressLine1 ?? '',
            addressLine2: jsonData.addressLine2 ?? '',
            city: jsonData.city ?? '',
            state: jsonData.state ?? '',
            zipCode: jsonData.zipCode ?? '',
            county: jsonData.county ?? '',
            bedrooms: jsonData.bedrooms ?? -1,
            bathrooms: jsonData.bathrooms ?? -1,
            latitude: jsonData.latitude ?? -1,
            longitude: jsonData.longitude ?? -1,
            squareFootage: jsonData.squareFootage ?? -1,
            propertyType: jsonData.propertyType ?? '',
            lotSize: jsonData.lotSize ?? -1,
            status: jsonData.status ?? '',
            yearBuilt: jsonData.yearBuilt ?? -1,
            price: jsonData.price ?? -1,
            listedDate: jsonData.listedDate ?? new Date(0),
            removedDate: jsonData.removedDate ?? new Date(0),
            createdDate: jsonData.createdDate ?? new Date(0),
            lastSeenDate: jsonData.lastSeenDate ?? new Date(0),
            daysOnMarket: jsonData.daysOnMarket ?? 0,   // Come back to this and think about what to do here
        };
    }

    private createRentCastPropertyResponseType(rentCastSalesResponse: RentCastResponse): RentCastPropertyResponseType {
        const jsonData = rentCastSalesResponse.apiResponseData;
        return {
            id: rentCastSalesResponse.id,
            formattedAddress: jsonData.formattedAddress ?? '',
            addressLine1: jsonData.addressLine1 ?? '',
            addressLine2: jsonData.addressLine2 ?? '',
            city: jsonData.city ?? '',
            state: jsonData.state ?? '',
            zipCode: jsonData.zipCode ?? '',
            county: jsonData.county ?? '',
            bedrooms: jsonData.bedrooms ?? -1,
            bathrooms: jsonData.bathrooms ?? -1,
            latitude: jsonData.latitude ?? -1,
            longitude: jsonData.longitude ?? -1,
            squareFootage: jsonData.squareFootage ?? -1,
            propertyType: jsonData.propertyType ?? '',
            lotSize: jsonData.lotSize ?? -1,
            yearBuilt: jsonData.yearBuilt ?? -1,

            assessorID: jsonData.assessorID ?? '',
            lastSalePrice: jsonData.lastSalePrice ?? -1,
            lastSaleDate: jsonData.lastSaleDate ?? new Date(0),
            ownerOccupied: jsonData.ownerOccupied ?? false,
            features: {
                garage: jsonData.features?.garage ?? false,
                pool: jsonData.features?.pool ?? false,
                floorCount: jsonData.features?.floorCount ?? -1,
                unitCount: jsonData.features?.unitCount ?? -1
            },
            previousYearPropertyTaxes: jsonData.propertyTaxes[(new Date().getFullYear() - 1)]?.total ?? -1,
            owner: {
                names: jsonData.owner?.names ?? [],
                mailingAddress: {
                    id: jsonData.owner?.mailingAddress?.id ?? '',
                    formattedAddress: jsonData.owner?.mailingAddress?.formattedAddress ?? '',
                    addressLine1: jsonData.owner?.mailingAddress?.addressLine1 ?? '',
                    addressLine2: jsonData.owner?.mailingAddress?.addressLine2 ?? '',
                    city: jsonData.owner?.mailingAddress?.city ?? '',
                    state: jsonData.owner?.mailingAddress?.state ?? '',
                    zipCode: jsonData.owner?.mailingAddress?.zipCode ?? '',
                },
            },
        };
    }
}