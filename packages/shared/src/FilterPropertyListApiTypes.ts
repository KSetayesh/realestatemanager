import { Filter, PropertyType, State } from "./Constants";

export interface FilterOn {
    value: number;
    filter: Filter;
};

export interface CreateFilteredPropertyListRequest {
    state?: State;
    zipCode: string;
    city: string;
    rentEstimate?: FilterOn;
    listedPrice?: FilterOn;
    numberOfBedrooms?: FilterOn;
    numberOfBathrooms?: FilterOn;
    squareFeet?: FilterOn;
    yearBuilt?: FilterOn;
    maxHoa?: FilterOn;
    monthlyPropertyTaxAmount?: FilterOn;
    homeType?: PropertyType;
    hasGarage: boolean,
    hasBasement: boolean,
    hasPool: boolean,
    isActive: boolean,
    limit: number,
};