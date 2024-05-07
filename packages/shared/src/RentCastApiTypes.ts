export interface RentCastApiRequestDTO {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    radius: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    status: string;
    daysOld: number;
    limit: number;
    offset: number;
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