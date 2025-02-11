import { PropertyStatus, PropertyType, State } from "../Constants";

export interface CreateRentCastApiRequest {
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

//------------------------------------------------------------------------------------------------

export interface RentCastDetailsResponseDTO {
    apiKeyName: string;
    apiCallsThisMonth: number;
    numberOfFreeApiCalls: number;
    remainingNumberOfFreeApiCalls: number;
    daysIntoBillingPeriod: number;
    canMakeApiCalls: boolean;
    billingPeriod: number;
    mostRecentBillingDate: string;
    firstBilledOn: string;
};

export type RentCastDetails = Omit<RentCastDetailsResponseDTO, 'mostRecentBillingDate' | 'firstBilledOn'> & {
    mostRecentBillingDate: Date;
    firstBilledOn: Date;
};

