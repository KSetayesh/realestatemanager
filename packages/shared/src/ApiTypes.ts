//-----Enums----

export enum HomeType {
    Condo = "Condo",
    SingleFamilyHome = "Single Family Home",
    TownHome = "Town Home",
    MultiFamilyHome = "Multi Family Home",
};

export enum Country {
    UnitedStates = "US",
};

export enum State {
    AL = "Alabama",
    AK = "Alaska",
    AZ = "Arizona",
    AR = "Arkansas",
    CA = "California",
    CO = "Colorado",
    CT = "Connecticut",
    DE = "Delaware",
    FL = "Florida",
    GA = "Georgia",
    HI = "Hawaii",
    ID = "Idaho",
    IL = "Illinois",
    IN = "Indiana",
    IA = "Iowa",
    KS = "Kansas",
    KY = "Kentucky",
    LA = "Louisiana",
    ME = "Maine",
    MD = "Maryland",
    MA = "Massachusetts",
    MI = "Michigan",
    MN = "Minnesota",
    MS = "Mississippi",
    MO = "Missouri",
    MT = "Montana",
    NE = "Nebraska",
    NV = "Nevada",
    NH = "New Hampshire",
    NJ = "New Jersey",
    NM = "New Mexico",
    NY = "New York",
    NC = "North Carolina",
    ND = "North Dakota",
    OH = "Ohio",
    OK = "Oklahoma",
    OR = "Oregon",
    PA = "Pennsylvania",
    RI = "Rhode Island",
    SC = "South Carolina",
    SD = "South Dakota",
    TN = "Tennessee",
    TX = "Texas",
    UT = "Utah",
    VT = "Vermont",
    VA = "Virginia",
    WA = "Washington",
    WV = "West Virginia",
    WI = "Wisconsin",
    WY = "Wyoming",
};

export enum InterestType {
    FIXED = "Fixed",
    VARIABLE = "Variable",
};

//-----Interfaces----

export interface ListingWithScenariosDTO {
    listingDetails: ListingDetailsDTO;
    scenarios: InvestmentScenarioDTO[];
}

export interface InvestmentScenarioDTO {
    mortgageDetails: MortgageDetailsDTO;
    financialProjections: FinancialProjectionsDTO;
    operatingExpenses: OperatingExpensesDTO;
    rentEstimate: number;
    purchasePrice: number;
};

export interface AmortizationDetailsDTO {
    month: number;
    year: number;
    monthlyPayment: number;
    interestPayment: number;
    principalPayment: number;
    remainingBalance: number;
    equityWithDownPayment: number;
    equityWithoutDownPayment: number;
    equityWithAppreciation: number;
    appreciationValue: number;
};

export interface FinancialProjectionsDTO {
    annualAppreciationRate?: number;
    annualTaxIncreaseRate?: number;
    annualRentIncreaseRate?: number;
};

export interface LoanDetailsDTO {
    loanAmount: number;
    annualInterestRate: number;
    termInYears: number;
    interestType: InterestType;
};

export interface MortgageDetailsDTO extends LoanDetailsDTO {
    downPaymentPercentage: number;
    pmiRate: number;
    monthlyPropertyTaxAmount?: number;
    monthlyHomeInsuranceAmount?: number;
    monthlyHOAFeesAmount?: number;
};

export interface OperatingExpensesDTO {
    propertyManagementRate?: number;
    vacancyRate?: number;
    maintenanceRate?: number;
    otherExpensesRate?: number;
    capExReserveRate?: number;
    legalAndProfessionalFees?: number;
    initialRepairCosts?: number;
    closingCosts?: number;
};

// ---ListingDetails related models---

export type AddressDTO = {
    fullAddress?: string;
    state?: State;
    zipcode?: string;
    city?: string;
    county?: string;
    country?: Country;
    streetAddress?: string;
    apartmentNumber?: string;
};

export interface ListingDetailsDTO {
    zillowURL: string;
    propertyDetails: PropertyDetailsDTO;
    zillowMarketEstimates: ZillowMarketEstimatesDTO;
    listingPrice: number;
};

export interface PropertyDetailsDTO {
    address?: AddressDTO;
    schoolRating?: SchoolRatingDTO;
    numberOfDaysOnMarket?: number;
    numberOfBedrooms?: number;
    numberOfFullBathrooms?: number;
    numberOfHalfBathrooms?: number;
    squareFeet?: number;
    acres?: number;
    yearBuilt?: number;
    hasGarage?: boolean;
    hasPool?: boolean;
    hasBasement?: boolean;
    homeType?: HomeType;
    description?: string;
};

export interface SchoolRatingDTO {
    elementarySchoolRating?: number;
    middleSchoolRating?: number;
    highSchoolRating?: number;
};

export interface ZillowMarketEstimatesDTO {
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

