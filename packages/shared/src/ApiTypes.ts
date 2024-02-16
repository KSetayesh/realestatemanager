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

export interface InvestmentAnalysis {
    amortizationDetails: AmortizationDetails;
    financialProjections: FinancialProjections;
    mortgageDetails: MortgageDetails;
    operatingExpenses: OperatingExpenses;
};

export interface AmortizationDetails {
    month: number;
    year: number;
    monthlyPayment: number;
    interestPayment: number;
    principalPayment: number;
    remainingBalance: number;
    equityWithDownPayment: number;
    equityWithoutDownPayment: number;
    equityWithAppreciation: number,
    appreciationValue: number,
};


export interface FinancialProjections {
    annualAppreciationRate?: number;
    annualTaxIncreaseRate?: number;
    annualRentIncreaseRate?: number;
};

export interface LoanDetails {
    principal: number;
    annualInterestRate: number;
    termInYears: number;
    interestType: InterestType;
};

export interface MortgageDetails extends LoanDetails {
    downPaymentPercentage: number;
    pmiRate: number;
    closingCosts?: number;
};

export interface OperatingExpenses {
    propertyManagementRate?: number;
    vacancyRate?: number;
    maintenanceRate?: number;
    otherExpensesRate?: number;
    capExReserveRate?: number;
    legalAndProfessionalFees?: number;
    initialRepairCosts?: number;
};

export type Address = {
    fullAddress?: string;
    state?: State;
    zipcode?: string;
    town?: string;
    county?: string;
    country?: Country;
    streetAddress?: string;
    apartmentNumber?: string;
};

export interface PropertyListing {
    listingDetails: ListingDetails;
    investmentAnalysis: InvestmentAnalysis;
};

export interface ListingDetails {
    zillowURL: string;
    propertyDetails: PropertyDetails;
    priceDetails: PriceDetails;
};

export interface PropertyDetails {
    address?: Address;
    numberOfDaysOnMarket?: number;
    elementarySchoolRating?: number;
    middleSchoolRating?: number;
    highSchoolRating?: number;
    numberOfBedrooms?: number;
    numberOfFullBathrooms?: number;
    numberOfHalfBathrooms?: number;
    squareFeet?: number;
    acres?: number;
    yearBuilt?: number;
    homeType?: HomeType;
};

export interface PriceDetails {
    listingPrice: number; // The current listing or sale price
    marketEstimates?: MarketEstimates;
    monthlyPropertyTaxAmount?: number;
    monthlyHomeInsuranceAmount?: number;
    monthlyHOAFeesAmount?: number;
};

export interface MarketEstimates {
    zestimate?: number; // Estimated market value
    rentEstimate?: number; // Estimated rental value
};

