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

export type DummyCSVDataType = {
    [K in keyof AddPropertyFormData]: string;
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

export enum TableColumnDetailsEnum {
    // Property List Columns
    PROPERTY_TYPE = 'PROPERTY_TYPE',
    PROPERTY_STATUS = 'PROPERTY_STATUS',
    FULL_ADDRESS = 'FULL_ADDRESS',
    STATE = 'STATE',
    ZIP_CODE = 'ZIP_CODE',
    ZILLOW_URL = 'ZILLOW_URL',
    PRICE = 'PRICE',
    RENT_ESTIMATE = 'RENT_ESTIMATE',
    INITIAL_COSTS = 'INITIAL_COSTS',
    LOAN_AMOUNT = 'LOAN_AMOUNT',
    DOWN_PAYMENT_AMOUNT = 'DOWN_PAYMENT_AMOUNT',
    ANNUAL_INTEREST_RATE = 'ANNUAL_INTEREST_RATE',
    ROI = 'ROI',
    CAP_RATE = 'CAP_RATE',
    RECURRING_COSTS = 'RECURRING_COSTS',
    INITIAL_MONTHLY_AMOUNT = 'INITIAL_MONTHLY_AMOUNT',
    MORTGAGE = 'MORTGAGE',
    MONTHLY_CASH_FLOW = 'MONTHLY_CASH_FLOW',
    YEARLY_CASH_FLOW = 'YEARLY_CASH_FLOW',
    NUMBER_OF_DAYS_ON_MARKET = 'NUMBER_OF_DAYS_ON_MARKET',
    DATE_LISTED = 'DATE_LISTED',
    DATE_CREATED = 'DATE_CREATED',
    CITY = 'CITY',
    COUNTY = 'COUNTY',
    COUNTRY = 'COUNTRY',
    STREET_ADDRESS = 'STREET_ADDRESS',
    APARTMENT_NUMBER = 'APARTMENT_NUMBER',
    LONGITUDE = 'LONGITUDE',
    LATITUDE = 'LATITUDE',
    ELEMENTARY_SCHOOL_RATING = 'ELEMENTARY_SCHOOL_RATING',
    MIDDLE_SCHOOL_RATING = 'MIDDLE_SCHOOL_RATING',
    HIGH_SCHOOL_RATING = 'HIGH_SCHOOL_RATING',
    NUMBER_OF_BEDROOMS = 'NUMBER_OF_BEDROOMS',
    NUMBER_OF_FULL_BATHROOMS = 'NUMBER_OF_FULL_BATHROOMS',
    NUMBER_OF_HALF_BATHROOMS = 'NUMBER_OF_HALF_BATHROOMS',
    SQUARE_FEET = 'SQUARE_FEET',
    ACRES = 'ACRES',
    YEAR_BUILT = 'YEAR_BUILT',
    HAS_GARAGE = 'HAS_GARAGE',
    HAS_POOL = 'HAS_POOL',
    HAS_BASEMENT = 'HAS_BASEMENT',
    LISTING_PRICE = 'LISTING_PRICE',
    ZESTIMATE = 'ZESTIMATE',
    ZILLOW_RENT_ESTIMATE = 'ZILLOW_RENT_ESTIMATE',
    ZESTIMATE_RANGE_LOW = 'ZESTIMATE_RANGE_LOW',
    ZESTIMATE_RANGE_HIGH = 'ZESTIMATE_RANGE_HIGH',
    ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT = 'ZILLOW_MONTHLY_PROPERTY_TAX_AMOUNT',
    ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT = 'ZILLOW_MONTHLY_HOME_INSURANCE_AMOUNT',
    ZILLOW_MONTHLY_HOA_FEES_AMOUNT = 'ZILLOW_MONTHLY_HOA_FEES_AMOUNT',
    CREATION_TYPE = 'CREATION_TYPE',
    DESCRIPTION = 'DESCRIPTION',
    INVESTMENT_BREAKDOWN_COLUMN = 'INVESTMENT_BREAKDOWN_COLUMN',

    // InvestmentBreakdown Columns
    YEAR = 'YEAR',
    MONTH = 'MONTH',
    DATE = 'DATE',
    //MORTGAGE
    TOTAL_INTEREST_PAID = 'TOTAL_INTEREST_PAID',
    TOTAL_PRINCIPAL_PAID = 'TOTAL_PRINCIPAL_PAID',
    REMAINING_BALANCE = 'REMAINING_BALANCE',
    // RENT ESTIMATE
    MONTHLY_INCOME = 'MONTHLY_INCOME',
    MONTHLY_EXPENSES = 'MONTHLY_EXPENSES',
    // MONTHLY CASH FLOW
    ACCUMULATED_CASH_FLOW = 'ACCUMULATED_CASH_FLOW',
    APPRECIATION_AMOUNT = 'APPRECIATION_AMOUNT',
    PMI_AMOUNT = 'PMI_AMOUNT',
    INTEREST_PAYMENT = 'INTEREST_PAYMENT',
    PRINCIPAL_PAYMENT = 'PRINCIPAL_PAYMENT',
    PERCENTAGE_OF_INTEREST = 'PERCENTAGE_OF_INTEREST',
    PERCENTAGE_OF_PRINCIPAL = 'PERCENTAGE_OF_PRINCIPAL',
    EQUITY_AMOUNT = 'EQUITY_AMOUNT',
    NET_OPERATING_INCOME = 'NET_OPERATING_INCOME',
    ACCUMULATED_NET_OPERATING_INCOME = 'ACCUMULATED_NET_OPERATING_INCOME',
    CASH_ON_CASH_RETURN = 'CASH_ON_CASH_RETURN',
    MONTHLY_NET_INCOME = 'MONTHLY_NET_INCOME',
    ACCUMULATED_NET_INCOME = 'ACCUMULATED_NET_INCOME',
    PROPERTY_MANAGEMENT_AMOUNT = 'PROPERTY_MANAGEMENT_AMOUNT',
    VACANCY_AMOUNT = 'VACANCY_AMOUNT',
    MAINTENANCE_AMOUNT = 'MAINTENANCE_AMOUNT',
    CAP_EX_RESERVE_AMOUNT = 'CAP_EX_RESERVE_AMOUNT',
    OTHER_EXPENSE_AMOUNT = 'OTHER_EXPENSE_AMOUNT',
    OPERATIONAL_COSTS = 'OPERATIONAL_COSTS',
    PROPERTY_TAX_AMOUNT = 'PROPERTY_TAX_AMOUNT',
    MONTHLY_HOME_INSURANCE_AMOUNT = 'MONTHLY_HOME_INSURANCE_AMOUNT',
    MONTHLY_HOA_FEES_AMOUNT = 'MONTHLY_HOA_FEES_AMOUNT',
    FIXED_COSTS = 'FIXED_COSTS',
    MONTHLY_PAYMENT = 'MONTHLY_PAYMENT',
    MONTHLY_PAYMENT_AND_OPERATIONAL_COSTS = 'MONTHLY_PAYMENT_AND_OPERATIONAL_COSTS',

    // Agent 
    FIRST_NAME = 'FIRST_NAME',
    LAST_NAME = 'LAST_NAME',
    FULL_NAME = 'FULL_NAME',
    WEBSITE = 'WEBSITE',
    COMPANY_NAME = 'COMPANY_NAME',
    PHONE_NUMBER = 'PHONE_NUMBER',
    EMAIL = 'EMAIL',
    AGENT_TYPE = 'AGENT_TYPE',

    // High Yield Savings 
    START_PRINCIPAL = 'START_PRINCIPAL',
    START_BALANCE = 'START_BALANCE',
    INTEREST = 'INTEREST',
    ACCUMULATED_INTEREST = 'ACCUMULATED_INTEREST',
    END_BALANCE = 'END_BALANCE',
    END_PRINCIPAL = 'END_PRINCIPAL',

    // RentCast
    API_KEY_NAME = 'API_KEY_NAME',
    CAN_MAKE_API_CALL = 'CAN_MAKE_API_CALL',
    API_CALLS_MAKE_THIS_MONTH = 'API_CALLS_MAKE_THIS_MONTH',
    REMAINING_NUMBER_OF_FREE_API_CALLS = 'REMAINING_NUMBER_OF_FREE_API_CALLS',
    DAYS_INTO_BILLING_PERIOD = 'DAYS_INTO_BILLING_PERIOD',
    BILLING_PERIOD = 'BILLING_PERIOD',
    MOST_RECENT_BILLING_DATE = 'MOST_RECENT_BILLING_DATE',
    FIRST_BILLED_ON = 'FIRST_BILLED_ON',
};

export enum SortDirection {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
};

export type PrimitiveType = string | boolean | number | undefined;

// Define a type that maps TableType to its corresponding DTO type
export type TableTypeSpecific<T extends TableType> =
    T extends TableType.PROPERTY_LIST_TABLE ? ListingWithScenariosResponseDTO :
    T extends TableType.INVESTMENT_BREAKDOWN_TABLE ? MonthlyInvestmentDetailsResponseDTO :
    T extends TableType.AGENT_TABLE ? AgentResponseDTO :
    T extends TableType.HIGH_YIELD_SAVINGS_TABLE ? HighYeildSavingsResponseDTO :
    T extends TableType.RENT_CAST_DETAILS_TABLE ? RentCastDetailsResponseDTO :
    T extends TableType.DUMMY_CSV_DATA_TABLE ? DummyCSVDataType : never;

// Define the sort and value function types based on TableType
export type SortFunction<T extends TableType> =
    (items: TableTypeSpecific<T>[], sortDirection?: SortDirection) => TableTypeSpecific<T>[];

export type ValueFunction<T extends TableType> =
    (item: TableTypeSpecific<T>) => PrimitiveType;

export type SetValueFunction<T extends TableType> =
    (item: TableTypeSpecific<T>, newValue: PrimitiveType) => void;

// Define the type for the table-specific details
export type TableTypeDetails<T extends TableType> = {
    value: ValueFunction<T>;
    setValue?: SetValueFunction<T>;
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

export enum TableType {
    PROPERTY_LIST_TABLE = 'PROPERTY_LIST_TABLE',
    INVESTMENT_BREAKDOWN_TABLE = 'INVESTMENT_BREAKDOWN_TABLE',
    AGENT_TABLE = 'AGENT_TABLE',
    HIGH_YIELD_SAVINGS_TABLE = 'HIGH_YIELD_SAVINGS_TABLE',
    RENT_CAST_DETAILS_TABLE = 'RENT_CAST_DETAILS_TABLE',
    DUMMY_CSV_DATA_TABLE = 'DUMMY_CSV_DATA_TABLE',
}

export enum InvestmentBreakdownTableType {
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
    MORTGAGE_BREAKDOWN = "MORTGAGE_BREAKDOWN",
    EXPENSES_BREAKDOWN = "EXPENSES_BREAKDOWN",
    INVESTMENT_BREAKDOWN = "INVESTMENT_BREAKDOWN",
}

export enum PropertiesListTableType {
    ALL = 'ALL',
    STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
}

export enum DefaultTableType {
    DEFAULT = 'DEFAULT',
}

export type TableTypeMapping = {
    [TableType.PROPERTY_LIST_TABLE]: {
        [key in PropertiesListTableType]: TableColumnDetailsEnum[]
    };
    [TableType.INVESTMENT_BREAKDOWN_TABLE]: {
        [key in InvestmentBreakdownTableType]: TableColumnDetailsEnum[]
    };
    [TableType.AGENT_TABLE]: {
        [key in DefaultTableType]: TableColumnDetailsEnum[]
    };
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        [key in DefaultTableType]: TableColumnDetailsEnum[]
    };
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        [key in DefaultTableType]: TableColumnDetailsEnum[]
    };
    [TableType.DUMMY_CSV_DATA_TABLE]: {
        [key in DefaultTableType]: TableColumnDetailsEnum[]
    };
};

export type ExportOption = {
    buttonName: string;
    enabled: boolean;
};

export type TableDetailType<T extends keyof TableTypeMapping> = {
    title: string;
    tableType: T;
    isEditable: boolean;
    canDeleteFromTable: boolean;
    isSortable: boolean;
    pageable: boolean;
    exportToCSV: ExportOption;
    subTables: TableTypeMapping[T];
};

export type TableDetailsType = {
    [K in TableType]: TableDetailType<K>;
};