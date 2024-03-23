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

export enum FinancingType {
    MORTGAGE = 'Mortgage',
    SELLER_FINANCING = 'SellerFinancing',
    PRIVATE_LOAN = 'PrivateLoan',
    OTHER = 'Other',
};

export enum ValueType {
    AMOUNT = 'Amount',
    RATE = 'Rate',
};

export enum DefaultInvestmentRates {
    PMI_RATE = 0, // PMI rate expressed as a percentage of the loan amount annually.
    PMI_DROP_OFF_POINT = 0,
    ANNUAL_INTEREST_RATE = 7, // Annual Interest rate of loan.
    DOWN_PAYMENT_PERCENTAGE = 20, // Typical down payment percentage for avoiding PMI.
    PROPERTY_MANAGEMENT_RATE = 10, // Percentage of rental income paid for property management.
    VACANCY_RATE = 10, // Percentage of the year that the property is expected to be vacant.
    MAINTENANCE_RATE = 1, // Percentage of the property's value allocated annually for maintenance.
    OTHER_EXPENSES_RATE = 3, // Miscellaneous expenses as a percentage of rental income.
    CAP_EX_RESERVE_RATE = 5, // Capital expenditure reserve as a percentage of rental income.
    LEGAL_AND_PROFESSIONAL_FEES = 1500, // Flat rate for legal and professional fees during purchase, in dollars.
    INITIAL_REPAIR_COST_RATE = 2, //5000, // Estimated initial repair costs in dollars.
    TRAVELING_COSTS = 0,
    OTHER_INITIAL_EXPENSES_RATE = 0,
    CLOSING_COST_RATE = 10, // Estimated closing costs in dollars.
    TERM_IN_YEARS = 30, // Term length of loan in years.
    ANNUAL_APPRECIATION_RATE = 2,
    ANNUAL_TAX_INCREASE_RATE = 1,
    ANNUAL_RENT_INCREASE_RATE = 2,
    ANNUAL_HOME_INSURANCE_INCREASE_RATE = 1,
    ANNUAL_HOA_FEES_INCREASE_RATE = 1,
    PARKING_FEES = 0,
    LAUNDRY_SERVICES = 0,
    STORAGE_UNIT_FEES = 0,
    OTHER_ADDITIONAL_INCOMES = 0,
    TAX_DEPRECIATION = 0,
    TAX_MORTGAGE_INTEREST = 0,
    TAX_OPERATING_EXPENSES = 0,
    INTEREST_TYPE = InterestType.FIXED,
};

export enum GrowthFrequency {
    YEARLY,
    MONTHLY,
    NONE,
}


//------------------------------ Investment Related Requests ------------------------------

// Defines the base structure for input that can either be a rate or an amount
export interface ValueInputBase {
    type: ValueType;
}

// Structure for specifying an absolute amount
export interface ValueAmountInput extends ValueInputBase {
    type: ValueType.AMOUNT;
    amount: number; // The fixed amount in dollars
}

// Structure for specifying a rate (as a percentage)
export interface ValueRateInput extends ValueInputBase {
    // growthFrequency: GrowthFrequency;
    type: ValueType.RATE;
    rate: number; // The rate as a percentage of some base value
}

export type ValueInput = ValueAmountInput | ValueRateInput;

export function isValueAmountInput(value: ValueInput): value is ValueAmountInput {
    return value.type === ValueType.AMOUNT;
}

export function isValueRateInput(value: ValueInput): value is ValueRateInput {
    return value.type === ValueType.RATE;
}


// Identifies a property using its address and a Zillow listing URL.
export type PropertyIdentifier = {
    fullAddress: string; // Complete physical address of the property.
    zillowURL: string; // URL to the property's Zillow listing for more details.
};

export interface InvestmentScenarioRequest {
    propertyIdentifier: PropertyIdentifier;
    useDefaultRequest: boolean;
    investmentDetails?: InvestmentDetailsRequest;
};

export interface InvestmentDetailsRequest {
    mortgageDetails: MortgageDetailsRequest;
    operatingExpenses: OperatingExpensesRequest;
    rentEstimate: ValueAmountInput;
    purchasePrice: number;
    growthProjections?: GrowthProjectionsRequest;
    additionalIncomeStreams?: AdditionalIncomeStreamsRequest;
    taxImplications?: TaxImplicationsRequest;
};

export interface TaxImplicationsRequest {
    depreciation: number; // Annual depreciation expense that can be deducted.
    mortgageInterest?: number; // Deductible mortgage interest expense.
    operatingExpenses?: number; // Deductible operating expenses.
    propertyTaxes?: number; // Deductible property tax expense.
};

// Represents additional sources of income from the property besides rent.
export type AdditionalIncomeStreamsRequest = {
    parkingFees?: ValueAmountInput; // Income from parking facilities, if available.
    laundryServices?: ValueAmountInput; // Income from on-site laundry services.
    storageUnitFees?: ValueAmountInput; // Income from storage units, if available.
    other?: ValueAmountInput; // Any other sources of income not covered above.
};

export type GrowthProjectionsRequest = {
    annualAppreciationRate: ValueRateInput;
    annualTaxIncreaseRate?: ValueRateInput;
    annualHomeInsuranceIncreaseRate?: ValueRateInput;
    annualHOAFeesIncreaseRate?: ValueRateInput;
    annualRentIncreaseRate: ValueRateInput;
    parkingFeesIncreaseRate?: ValueRateInput; // ValueAmountInput; // Income from parking facilities, if available.
    laundryServicesIncreaseRate?: ValueRateInput; //ValueAmountInput; // Income from on-site laundry services.
    storageUnitFeesIncreaseRate?: ValueRateInput; //ValueAmountInput; // Income from storage units, if available.
    otherAdditionalIncomeStreamsIncreaseRate?: ValueRateInput;
};

export interface LoanDetailsRequest {
    annualInterestRate: number;
    termInYears: number;
    interestType: InterestType;
};

export interface MortgageDetailsRequest extends LoanDetailsRequest {
    downPayment: ValueInput; // Now accepts both amount and rate.
    pmiRate?: number; // Now accepts both amount and rate.
    pmiDropoffPoint?: number;
    monthlyPropertyTax?: ValueInput; // Now accepts both amount and rate.
    monthlyHomeInsuranceAmount?: ValueInput; // Now accepts both amount and rate.
    monthlyHOAFeesAmount?: ValueInput; // Now accepts both amount and rate.
};

export interface OperatingExpensesRequest {
    propertyManagementRate?: ValueRateInput;
    vacancyRate?: ValueRateInput;
    maintenanceRate?: ValueRateInput;
    otherExpensesRate?: ValueRateInput;
    capExReserveRate?: ValueRateInput;
    legalAndProfessionalFees?: ValueInput;
    initialRepairCosts?: ValueInput;
    travelingCosts?: ValueInput;
    closingCosts?: ValueInput;
    otherInitialExpenses?: ValueInput;
};

//------------------------------ Investment Related Response ------------------------------

export interface ListingWithScenariosDTO {
    listingDetails: ListingDetailsDTO;
    metrics: InvestmentMetricsResponseDTO[];
};

/**
 * Represents the amount and rate of a financial metric.
 */

// Represents additional sources of income from the property besides rent.
// export type AdditionalIncomeStreamsDTO = {
//     totalAmount: number;
//     breakdown: {
//         parkingFees?: number; // Income from parking facilities, if available.
//         laundryServices?: number; // Income from on-site laundry services.
//         storageUnitFees?: number; // Income from storage units, if available.
//         other?: number; // Any other sources of income not covered above.
//     }
// };

// // Details about the down payment made on the property.
// export type DownPaymentBreakdownDTO = {
//     downPaymentAmount: number; // The absolute amount of the down payment.
//     downPaymentPercentage: number; // The down payment as a percentage of the purchase price.
// };

// // Breakdown of the initial costs incurred when purchasing the property.
// export type InitialCostsBreakdownDTO = {
//     totalCosts: number; // Sum of all initial costs.
//     breakdown: {
//         downPaymentAmount: number;
//         legalAndProfessionalFees: number; // Costs for legal services, inspections, etc.
//         initialRepairCosts: number; // Costs for repairs needed before the property can be rented out.
//         closingCosts: number; // Administrative and other fees paid at closing.
//         travelingCosts: number; // Costs related to traveling to view/inspect the property.
//         otherExpenses: number; // Any other initial costs not categorized above.
//     };
// };


// Combines mortgage details with recurring property expenses for comprehensive cost analysis.
// export type MortgageWithFixedExpensesBreakdownDTO = {
//     totalCosts: number; // Total of mortgage and recurring expenses.
//     breakdown: {
//         mortgageBreakdown: MortgageBreakdownDTO; // Details of the mortgage.
//         fixedMonthlyExpenses: FixedMonthlyExpensesDTO; // Detailed fixed monthly expenses.
//     };
// };

// export type MortgageWithAllExpensesBreakdownDTO = {
//     totalCosts: number;
//     breakdown: {
//         mortgageWithFixedExpenses: MortgageWithFixedExpensesBreakdownDTO;
//         recurringExpensesBreakdown: RecurringExpensesBreakdownDTO; // Details of recurring expenses.
//     };
// };

// Details about PMI, a necessary cost if the down payment is below a certain threshold.
// export type PMIDetailsDTO = {
//     pmiAmount: number; // The monthly PMI payment.
//     pmiRate: number; // PMI rate used to calculate the pmiAmount.
//     pmiRateFormula: string; // A description on PMIRate is calculated
//     pmiDropoffPoint: number; // Loan-to-value ratio (%) at which PMI is no longer required.
// };

// Breakdown of the mortgage, including principal and interest, as well as PMI details if applicable.
// export type MortgageBreakdownDTO = {
//     remainingLoanAmount: number; // The total loan amount for the mortgage.
//     monthlyMortgagePayment: number; // Base monthly mortgage payment, excluding PMI.
//     pmiDetails?: PMIDetailsDTO; // Optional PMI details, applicable if LTV ratio warrants.
//     breakdown?: {
//         principalAmount: number; // Portion of monthly payment going toward the loan principal.
//         percentTowardsPrincipal: number; // Percentage of monthly payment applied to the principal.
//         interestAmount: number; // Portion of monthly payment going toward interest.
//         percentTowardsInterest: number; // Percentage of monthly payment applied to interest.
//     };
// };

// export type FixedMonthlyExpensesDTO = {
//     totalCosts: number; // Total of all recurring expenses.
//     breakdown: {
//         monthlyPropertyTaxAmount: number; // Fixed monthly amount allocated for property taxes.
//         monthlyHomeInsuranceAmount: number; // Fixed monthly home insurance payment.
//         monthlyHOAFeesAmount: number; // Monthly HOA fees, if applicable.
//     }
// };

// Detailed breakdown of recurring expenses associated with managing and maintaining the property.
// export type RecurringExpensesBreakdownDTO = {
//     totalCosts: number; // Total of all recurring expenses.
//     breakdown: {
//         propertyManagementAmount: number; // Costs associated with property management services.
//         vacancyAmount: number; // Costs accounted for potential vacancy periods.
//         maintenanceAmount: number; // Regular maintenance and repair costs.
//         otherExpensesAmount: number; // Any other recurring expenses not explicitly mentioned.
//         capExReserveAmount: number; // Allocation for capital expenditures/reserves.
//     };
// };

// // Breakdown of equity in the property, considering different scenarios.
// export type EquityBreakdownDTO = {
//     equityAmountWithDownPayment: number; // Equity considering the initial down payment.
//     equityAmountWithoutDownPayment: number; // Hypothetical equity without the down payment.
//     equityAmountWithAppreciation: number; // Equity considering property appreciation.
//     appreciationAmount: number; // Total amount of appreciation.
// };

// Implications for taxes, including potential deductions and depreciation benefits.
// export type TaxImplicationsDTO = {
//     depreciation: number; // Annual depreciation expense that can be deducted.
//     taxDeductions: {
//         mortgageInterest?: number; // Deductible mortgage interest expense.
//         operatingExpenses?: number; // Deductible operating expenses.
//         propertyTaxes?: number; // Deductible property tax expense.
//     };
// };

// Projections for growth in rent, property value, and taxes.
// export type GrowthProjectionsDTO = {
//     annualRentIncreaseRate: number; // Expected annual percentage increase in rent.
//     annualAppreciationRate: number; // Expected annual percentage increase in property value.
//     annualTaxIncreaseRate?: number; // Expected annual percentage increase in property taxes.
// };

// Options for financing the property purchase, including loan terms and conditions.
// export type FinancingOptionDTO = {
//     type: FinancingType; // Type of financing (e.g., conventional, FHA).
//     terms: FinancingTermsDTO; // Specific terms of the financing option.
// };

// // Terms of the financing option, detailing loan amount, interest rate, etc.
// export type FinancingTermsDTO = {
//     loanAmount: number; // Total loan amount.
//     annualInterestRate: number; // Interest rate of the loan.
//     interestType: InterestType; // Type of interest, either fixed or variable
//     termInYears: number; // Duration of the loan in years.
//     interestOnlyPeriod?: number; // Optional period where only interest payments are made.
//     monthlyPayment?: number; // Total monthly payment, including principal and interest.
// };

// Details of cash flow from the property, including income, expenses, and net amount.
// export type CashFlowDetailsDTO = {
//     totalAmount: number; // Net cash flow after accounting for all expenses and income.
//     breakdown: {
//         totalExpenses: {
//             mortgagePayment: number; // Monthly mortgage payment, including PMI if applicable.
//             pmi?: number; // PMI payment listed separately for clarity until it drops off.
//             recurringExpensesTotal: number; // Sum of all recurring expenses.
//         };
//         totalIncome: {
//             rent: number; // Monthly rental income.
//             additionalIncomeStreamsTotal?: number;
//             // Additional income streams can be added here for total income calculation.
//         };
//     };
// };

// // Consolidated cash flow information on a monthly and yearly basis.
// export type CashFlowDTO = {
//     monthlyCashFlow: CashFlowDetailsDTO;
//     yearlyCashFlow: CashFlowDetailsDTO;
// };

// export type RateAndValueDTO = {
//     value?: ValueAmountInput;
//     percentage?: ValueRateInput;
// };

// export type ValueAndDescriptionDTO = {
//     description: string;
//     value: string | number;
// };

export type AmountAndPercentageDTO = {
    description?: string;
    amount: number;
    percentage: number;
};

export interface GrowthProjectionsDTO {
    annualAppreciationRate: number;
    annualTaxIncreaseRate: number;
    annualHomeInsuranceIncreaseRate: number;
    annualHOAFeesIncreaseRate: number;
    annualRentIncreaseRate: number;
    parkingFeesIncreaseRate: number; // ValueAmountInput; // Income from parking facilities, if available.
    laundryServicesIncreaseRate: number; //ValueAmountInput; // Income from on-site laundry services.
    storageUnitFeesIncreaseRate: number; //ValueAmountInput; // Income from storage units, if available.
    otherAdditionalIncomeStreamsIncreaseRate: number;
};

export interface FinancingTermsDTO {
    annualInterestRate: number;
    interestType: InterestType;
    termInYears: number;
    monthlyPayment?: number;
    interestOnlyPeriod?: number;
};

export interface AdditionalIncomeStreamsDTO {
    parkingFees: number;
    laundryServices: number;
    storageUnitFees: number;
    otherAdditionalIncomeStreams: number;
};

export interface FixedMonthlyExpensesDTO {
    monthlyPropertyTax: number;
    monthlyHomeInsuranceAmount: number;
    monthlyHOAFeesAmount: number;
};

export interface RecurringExpensesDTO {
    propertyManagementRate: number;
    vacancyRate: number;
    maintenanceRate: number;
    otherExpensesRate: number;
    capExReserveRate: number;
};

export interface IncomesDTO {
    rentalIncome: number;
    additionalIncomeStreams: AdditionalIncomeStreamsDTO;
};

export interface ExpensesDTO {
    fixedMonthlyExpenses: FixedMonthlyExpensesDTO;
    recurringExpenses: RecurringExpensesDTO;
    initialCosts: InitialCostsDTO;
};

export interface TransactionsDTO {
    incomes: IncomesDTO;
    expenses: ExpensesDTO;
};

export interface InitialCostsDTO {
    totalAmount: number;
    breakdown: {
        downPaymentAmount: number;
        legalAndProfessionalFees: number;
        initialRepairCosts: AmountAndPercentageDTO;
        closingCosts: AmountAndPercentageDTO;
        travelingCosts: number;
        otherExpenses: AmountAndPercentageDTO;
    },
};

export interface TaxImplicationsDTO {
    depreciation: number;
    mortgageInterest: number;
    operatingExpenses: number;
    propertyTaxes?: number;
};

export interface PMIDetailsDTO {
    pmiRate: number;
    pmiDropoffPoint: number;
};

export interface MortgageDetailsDTO {
    purchasePrice: number;
    downpayment: AmountAndPercentageDTO;
    loanAmount: AmountAndPercentageDTO;
    financingTerms: FinancingTermsDTO;
    transactions: TransactionsDTO;
    pmiDetails: PMIDetailsDTO;
};

export interface InvestmentProjectionsDTO {
    ROI: number;
    capRate: number;
    recurringCosts: number;
    monthlyPayment: number;
    mortgageAmount: number;
    monthlyCashFlow: number;
    yearlyCashFlow: number;
    ammortizationDetails?: AmortizationDetailsDTO[]; // Optional amortization details over time.
};

// Comprehensive details of the investment metrics for a property.
export interface InvestmentMetricsResponseDTO {

    mortgageDetails: MortgageDetailsDTO;
    growthProjections: GrowthProjectionsDTO;
    taxImplications: TaxImplicationsDTO;
    investmentProjections: InvestmentProjectionsDTO;

    // purchasePrice: ValueAndDescriptionDTO;
    // rentEstimate: ValueAndDescriptionDTO;
    // // initialCosts: ValueAndDescriptionDTO;
    // loanAmount: AmountAndPercentageDTO;
    // downPayment: AmountAndPercentageDTO;
    // annualInterestRate: ValueAndDescriptionDTO;
    // //--------------------------------------------------------------------------------

    // ROI: ValueAndDescriptionDTO;
    // capRate: ValueAndDescriptionDTO;
    // recurringCosts: ValueAndDescriptionDTO;
    // monthlyPayment: ValueAndDescriptionDTO;
    // mortgageAmount: ValueAndDescriptionDTO;
    // monthlyCashFlow: ValueAndDescriptionDTO;
    // yearlyCashFlow: ValueAndDescriptionDTO;
    // ammortizationDetails?: AmortizationDetailsDTO[]; // Optional amortization details over time.
};

// Details of amortization for the mortgage, reflecting changes over time.
export interface AmortizationDetailsDTO {
    month: number;
    date: string;
    year: number;
    recurringCosts: number;
    fixedCosts: number;
    monthlyPayment: number;
    monthlyPaymentAndRecurringCosts: number;
    rentEstimate: number;
    monthlyCashFlow: number;
    accumulatedCashFlow: number;
    mortgageAmount: number;
    amountPaidInInterest: AmountAndPercentageDTO;
    amountPaidInPrincipal: AmountAndPercentageDTO;
    totalInterestPaid: number;
    remainingBalance: number;
    equityWithDownPayment: number;
    equityAmountWithoutDownPayment: number;
    equityAmountWithAppreciation: number;
    appreciationAmount: number;
    // month: number; // Month number of the amortization schedule.
    // date: string;
    // year: number; // Year of the amortization schedule.
    // remainingBalance: number; // Remaining balance of the mortgage.
    // mortgageWithAllExpensesBreakdown: MortgageWithAllExpensesBreakdownDTO; // Breakdown including mortgage and recurring expenses.
    // cashFlowAmount: CashFlowDTO; // Cash flow details associated with this point in time.
    // equityBreakdown: EquityBreakdownDTO; // Equity breakdown at this point in time.
};


//------------------------------ ListingDetails related models ------------------------------

export interface ListingDetailsDTO {
    zillowURL: string;
    propertyDetails: PropertyDetailsDTO;
    zillowMarketEstimates: ZillowMarketEstimatesDTO;
    listingPrice: number;
    dateListed?: string;
    dateCreated?: string;
    dateUpdated?: string;
    numberOfDaysOnMarket?: number;
};

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

export interface PropertyDetailsDTO {
    address?: AddressDTO;
    schoolRating?: SchoolRatingDTO;
    // numberOfDaysOnMarket?: number;
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

