import { 
    Country, 
    ListingCreationType, 
    PropertyStatus, 
    PropertyType, 
    State 
} from "./Constants";
import { PropertyIdentifier } from "./InvestmentTypes";

export interface CreateListingDetailsRequest {
    zillowURL: string;
    propertyDetails: CreatePropertyDetailsRequest;
    zillowMarketEstimates: CreateZillowMarketEstimatesRequest;
    listingPrice: number;
    dateCreated?: string;
    dateUpdated?: string;
    numberOfDaysOnMarket?: number;
    propertyStatus?: PropertyStatus;
};

export type CreateAddressRequest = {
    fullAddress?: string;
    state?: State;
    zipcode?: string;
    city?: string;
    county?: string;
    country?: Country;
    streetAddress?: string;
    apartmentNumber?: string;
    longitude?: number;
    latitude?: number;
};

export interface CreatePropertyDetailsRequest {
    address?: CreateAddressRequest;
    schoolRating?: CreateSchoolRatingRequest;
    numberOfBedrooms?: number;
    numberOfFullBathrooms?: number;
    numberOfHalfBathrooms?: number;
    squareFeet?: number;
    acres?: number;
    yearBuilt?: number;
    hasGarage?: boolean;
    hasPool?: boolean;
    hasBasement?: boolean;
    propertyType?: PropertyType;
    description?: string;
};

export interface CreateSchoolRatingRequest {
    elementarySchoolRating?: number;
    middleSchoolRating?: number;
    highSchoolRating?: number;
};

export interface CreateZillowMarketEstimatesRequest {
    zestimate?: number; // Estimated market value
    zestimateRange?: {
        low?: number,
        high?: number,
    },
    zillowRentEstimate?: number; // Estimated rental value
    zillowMonthlyPropertyTaxAmount?: number;
    zillowMonthlyHomeInsuranceAmount?: number;
    zillowMonthlyHOAFeesAmount?: number;
};

export interface CreateUpdatePropertyRequest {
    propertyIdentifier: PropertyIdentifier;
    price: number;
    rentEstimate: number;
    elementarySchoolRating: number;
    middleSchoolRating: number;
    highSchoolRating: number;
    numberOfBedrooms: number;
    numberOfFullBathrooms: number;
    numberOfHalfBathrooms: number;
    squareFeet: number;
    acres: number;
    yearBuilt: number;
    hasGarage: boolean;
    hasPool: boolean;
    hasBasement: boolean;
    listingPrice: number;
    zestimate: number;
    zillowRentEstimate: number;
    zestimateRangeLow: number;
    zestimateRangeHigh: number;
    zillowMonthlyPropertyTaxAmount: number;
    zillowMonthlyHomeInsuranceAmount: number;
    zillowMonthlyHOAFeesAmount: number;
    description: string;
};

//------------------------------------------------------------------------------------------------

export interface ListingDetailsResponseDTO {
    zillowURL: string;
    propertyDetails: PropertyDetailsResponseDTO;
    zillowMarketEstimates: ZillowMarketEstimatesResponseDTO;
    listingPrice: number;
    dateListed: string;
    dateCreated: string;
    dateUpdated: string;
    numberOfDaysOnMarket: number;
    propertyStatus: PropertyStatus;
    creationType: ListingCreationType;
};

export type AddressResponseDTO = {
    fullAddress?: string;
    state?: State;
    zipcode?: string;
    city?: string;
    county?: string;
    country?: Country;
    streetAddress?: string;
    apartmentNumber?: string;
    longitude?: number;
    latitude?: number;
};

export interface PropertyDetailsResponseDTO {
    address?: AddressResponseDTO;
    schoolRating?: SchoolRatingResponseDTO;
    numberOfBedrooms?: number;
    numberOfFullBathrooms?: number;
    numberOfHalfBathrooms?: number;
    squareFeet?: number;
    acres?: number;
    yearBuilt?: number;
    hasGarage?: boolean;
    hasPool?: boolean;
    hasBasement?: boolean;
    propertyType?: PropertyType;
    description?: string;
};

export interface SchoolRatingResponseDTO {
    elementarySchoolRating: number;
    middleSchoolRating: number;
    highSchoolRating: number;
};

export interface ZillowMarketEstimatesResponseDTO {
    zestimate?: number; // Estimated market value
    zestimateRange?: {
        low?: number,
        high?: number,
    },
    zillowRentEstimate?: number; // Estimated rental value
    zillowMonthlyPropertyTaxAmount?: number;
    zillowMonthlyHomeInsuranceAmount?: number;
    zillowMonthlyHOAFeesAmount?: number;
};