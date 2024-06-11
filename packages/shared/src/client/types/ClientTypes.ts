import {
    Country,
    Filter,
    PercentageAndAmount,
    PropertyStatus,
    PropertyType,
    State
} from "../../Constants";

export interface CreatePropertiesInBulkRequest {
    csvData: Record<string, string | number>[];
};

export interface TitleAndName {
    title: string;
    name: string;
};

export type AddFormTitlesAndLabel<T> = {
    [K in keyof T]: TitleAndName;
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

export type AgentFormData = {
    firstName: string;
    lastName: string;
    website: string;
    companyName: string,
    phoneNumber: string;
    email: string;
    country: string;
    state: string;
    agentType: string;
};

export type CollectPropertiesFormData = {
    address: string;
    city: string;
    state: State;
    zipcode: string;
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

export type HighYieldSavingsFormData = {
    initialDeposit: number;
    annualInterestRate: number;
    years: number;
    monthlyDeposit: number;
};

export type InvestmentFormData = {
    downPaymentType: PercentageAndAmount,
    downPaymentPercentage: number,
    pmiRate: number,
    pmiDropoffPoint: number,
    monthlyPropertyTaxType: PercentageAndAmount,
    monthlyPropertyTax: number,
    monthlyHomeInsuranceAmountType: PercentageAndAmount,
    monthlyHomeInsuranceAmount: number,
    monthlyHOAFeesAmountType: PercentageAndAmount,
    monthlyHOAFeesAmount: number,
    annualInterestRate: number,
    termInYears: number,
    interestType: string,
    propertyManagementRate: number,
    vacancyRate: number,
    maintenanceRate: number,
    otherExpensesRate: number,
    capExReserveRate: number,
    legalAndProfessionalFeesType: PercentageAndAmount,
    legalAndProfessionalFees: number,
    initialRepairCostsType: PercentageAndAmount,
    initialRepairCosts: number,
    travelingCostsType: PercentageAndAmount,
    travelingCosts: number,
    closingCostsType: PercentageAndAmount,
    closingCosts: number,
    otherInitialExpensesType: PercentageAndAmount,
    otherInitialExpenses: number,
    rentEstimate: number,
    purchasePrice: number,
    annualRentIncreaseRate: number,
    annualAppreciationRate: number,
    annualTaxIncreaseRate: number,
    annualHomeInsuranceIncreaseRate: number,
    annualHOAFeesIncreaseRate: number,
    parkingFees: number,
    laundryServices: number,
    storageUnitFees: number,
    other: number,
    depreciation: number,
    mortgageInterest: number,
    operatingExpenses: number,
    propertyTaxes: number,
};

export type PropertyFilterFormFields = {
    state: State | string;
    zipCode: string;
    city: string;
    rentEstimateFilter: Filter | string;
    rentEstimate: number | string;
    listedPriceFilter: Filter | string;
    listedPrice: number | string;
    numberOfBedroomsFilter: Filter | string;
    numberOfBedrooms: number | string;
    numberOfBathroomsFilter: Filter | string;
    numberOfBathrooms: number | string;
    squareFeetFilter: Filter | string;
    squareFeet: number | string;
    yearBuiltFilter: Filter | string;
    yearBuilt: number | string;
    maxHoaFilter: Filter | string;
    maxHoa: number | string;
    monthlyPropertyTaxAmountFilter: Filter | string;
    monthlyPropertyTaxAmount: number | string;
    homeType: PropertyType | string;
    hasGarage: boolean;
    hasBasement: boolean;
    hasPool: boolean;
    isActive: boolean;
    limit: number;
};