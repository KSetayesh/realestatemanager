import { PropertyStatus, PropertyType, State } from "./Constants";

export interface RentCastApiRequestDTO {
    address: string;
    city: string;
    state: State;
    zipCode: string;
    latitude: number;
    longitude: number;
    radius: number;
    propertyType: PropertyType;
    bedrooms: number;
    bathrooms: number;
    status: PropertyStatus;
    daysOld: number;
    limit: number;
    offset: number;
    retrieveExtraData: boolean;
};

export interface RentCastDetailsDTO {
    apiCallsThisMonth: number;
    numberOfFreeApiCalls: number;
    remainingNumberOfFreeApiCalls: number;
    daysIntoBillingPeriod: number;
    canMakeApiCalls: boolean;
    billingPeriod: number;
    mostRecentBillingDate: Date;
    firstBilledOn: Date;
};