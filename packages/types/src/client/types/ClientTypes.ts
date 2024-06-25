import {
    Country,
    Filter,
    PercentageAndAmount,
    PropertyStatus,
    PropertyType,
    State
} from "../../Constants";
import { AgentResponseDTO } from "../../server/AgentApiTypes";
import { HighYeildSavingsResponseDTO } from "../../server/HighYieldSavingsApiTypes";
import {
    ListingWithScenariosResponseDTO,
    MonthlyInvestmentDetailsResponseDTO
} from "../../server/InvestmentTypes";
import { RentCastDetailsResponseDTO } from "../../server/RentCastApiTypes";
import { TableColumnDetailsEnum } from "../tabledata/TableColumnConfig";
import { TableType } from "../tabledata/TableConfig";

export enum InputType {
    TEXT = 'text',
    SELECT = 'select',
    NUMBER = 'number',
    RADIO = 'radio',
    STRING = 'string',
    CHECKBOX = 'checkbox',
};

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

export enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
};

export type PrimitiveType = string | boolean | number;

// Define a type that maps TableType to its corresponding DTO type
export type TableTypeSpecific<T extends TableType> =
    T extends TableType.PROPERTY_LIST_TABLE ? ListingWithScenariosResponseDTO :
    T extends TableType.INVESTMENT_BREAKDOWN_TABLE ? MonthlyInvestmentDetailsResponseDTO :
    T extends TableType.AGENT_TABLE ? AgentResponseDTO :
    T extends TableType.HIGH_YIELD_SAVINGS_TABLE ? HighYeildSavingsResponseDTO :
    T extends TableType.RENT_CAST_DETAILS_TABLE ? RentCastDetailsResponseDTO : never;

// Define the sort and value function types based on TableType
export type SortFunction<T extends TableType> =
    (items: TableTypeSpecific<T>[], sortDirection?: SortDirection) => TableTypeSpecific<T>[];

export type ValueFunction<T extends TableType> =
    (item: TableTypeSpecific<T>) => PrimitiveType;

// Define the type for the table-specific details
export type TableTypeDetails<T extends TableType> = {
    sortFunction?: SortFunction<T>;
    value: ValueFunction<T>;
};

export type ColumnDetail = {
    title: string;
    accessor: string;
    inputType: InputType;
    isUrl: boolean;
    isDollarAmount: boolean;
    addSuffix: string;
    showColumn: boolean,
    isEditable: boolean,
    isSortable: boolean,
    detailedDescription: string,
    routeTo?: string,
    // tableTypeDetails?: TableTypeDetails<T>,
} & {
        [T in TableType]?: TableTypeDetails<T>;
    };

// Define the type for the sortMap structure
export type ColumnsDetails = {
    [key in TableColumnDetailsEnum]: ColumnDetail;
};