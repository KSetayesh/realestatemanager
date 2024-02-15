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
    Alabama = "AL",
    Alaska = "AK",
    Arizona = "AZ",
    Arkansas = "AR",
    California = "CA",
    Colorado = "CO",
    Connecticut = "CT",
    Delaware = "DE",
    Florida = "FL",
    Georgia = "GA",
    Hawaii = "HI",
    Idaho = "ID",
    Illinois = "IL",
    Indiana = "IN",
    Iowa = "IA",
    Kansas = "KS",
    Kentucky = "KY",
    Louisiana = "LA",
    Maine = "ME",
    Maryland = "MD",
    Massachusetts = "MA",
    Michigan = "MI",
    Minnesota = "MN",
    Mississippi = "MS",
    Missouri = "MO",
    Montana = "MT",
    Nebraska = "NE",
    Nevada = "NV",
    NewHampshire = "NH",
    NewJersey = "NJ",
    NewMexico = "NM",
    NewYork = "NY",
    NorthCarolina = "NC",
    NorthDakota = "ND",
    Ohio = "OH",
    Oklahoma = "OK",
    Oregon = "OR",
    Pennsylvania = "PA",
    RhodeIsland = "RI",
    SouthCarolina = "SC",
    SouthDakota = "SD",
    Tennessee = "TN",
    Texas = "TX",
    Utah = "UT",
    Vermont = "VT",
    Virginia = "VA",
    Washington = "WA",
    WestVirginia = "WV",
    Wisconsin = "WI",
    Wyoming = "WY",
};

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
};

export interface InvestmentPropertyDTO {
    // propertyInformation: PropertyInformationDTO;
    amortizationSchedule: AmortizationScheduleDTO;
    projections: ProjectionsDTO;
    mortgage: MortgageDTO;
    additionalExpenses: AdditionalExpensesDTO;
    rentEstimate: number;
};

export interface AmortizationScheduleDTO {
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


export interface ProjectionsDTO {
    annualAppreciationRate?: number;
    annualTaxIncreaseRate?: number;
    annualRentIncreaseRate?: number;
};

export interface LoanDTO {
    principal: number; // The total loan amount
    annualInterestRate: number; // The annual interest rate as a percentage (e.g., 5.3 for 5.3%)
    termInYears: number; // The term of the loan in years
};

export interface MortgageDTO extends LoanDTO {
    costOfProperty: number;
    downPaymentPercentage: number;
    closingCostsRate: number;
    pmiRate: number;
    monthlyPropertyTaxAmount: number;
    monthlyHomeInsuranceAmount: number;
    monthlyHOAFeesAmount: number;
};

export interface AdditionalExpensesDTO {
    propertyManagementRate?: number;
    vacancyRate?: number;
    maintenanceRate?: number;
    otherExpensesRate?: number;
    capExReserveRate?: number; // Optional field for capital expenditure reserve
    legalAndProfessionalFees?: number; // Optional
    initialRepairCosts?: number;
};

export interface InvestmentPropertiesData {
    investmentProperties: { investmentProperty: InvestmentPropertyDTO }[];
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

export interface ListingInformationDTO {
    zillowURL: string;
    propertyInformation: PropertyInformationDTO;
    listingPriceInformation: ListingPriceInformationDTO;
};

export interface PropertyInformationDTO {
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

export interface ListingPriceInformationDTO {
    price?: number;
    zestimate?: number;
    rentEstimate?: number;
    monthlyPropertyTaxAmount?: number;
    monthlyHomeInsuranceAmount?: number;
    monthlyHOAFeesAmount?: number;
};
