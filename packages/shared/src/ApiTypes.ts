
//------------------------------ Investment Related Requests ------------------------------

import {
    Country,
    InterestType,
    PropertyStatus,
    PropertyType,
    State,
    TransactionKey,
    TransactionType,
    ValueType,
} from './Constants';
import { CreateFilteredPropertyListRequest } from './FilterPropertyListApiTypes';
import { ListingDetailsResponseDTO } from './ListingTypes';

// Defines the base structure for input that can either be a rate or an amount
export interface ValueInputBase {
    type: ValueType;
};

// Structure for specifying an absolute amount
export interface ValueAmountInput extends ValueInputBase {
    type: ValueType.AMOUNT;
    amount: number; // The fixed amount in dollars
};

// Structure for specifying a rate (as a percentage)
export interface ValueRateInput extends ValueInputBase {
    // growthFrequency: GrowthFrequency;
    type: ValueType.RATE;
    rate: number; // The rate as a percentage of some base value
};

export type ValueInput = ValueAmountInput | ValueRateInput;

export function isValueAmountInput(value: ValueInput): value is ValueAmountInput {
    return value.type === ValueType.AMOUNT;
};

export function isValueRateInput(value: ValueInput): value is ValueRateInput {
    return value.type === ValueType.RATE;
};

export interface CreatePropertiesInBulkRequest {
    csvData: Record<string, string | number>[];
};

export type AddPropertyFormData = {
    zillowURL: string;
    fullAddress: string;
    state: State;
    zipcode: string;
    city: string;
    county: string;
    country: Country;
    streetAddress: string;
    apartmentNumber: string;
    longitude: number;
    latitude: number;
    numberOfDaysOnMarket: number;
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
    propertyType: PropertyType;
    propertyStatus: PropertyStatus;
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

export type AddPropertyTitlesAndLabelsType = {
    [K in keyof AddPropertyFormData]: {
        title: string;
        name: string;
    };
};

