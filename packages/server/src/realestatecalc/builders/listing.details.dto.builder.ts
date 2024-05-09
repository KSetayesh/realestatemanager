import { Country, PropertyStatus, PropertyType, State } from "@realestatemanager/shared";
import { RentCastResponse } from "../models/rent_cast_api_models/rentcastresponse.model";

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

    build() {
        
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
}