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

//------------------------------ Investment Related Requests ------------------------------

export interface ListingWithScenariosDTO {
    listingDetails: ListingDetailsDTO;
    metrics: InvestmentMetricsResponseDTO[];
};

export interface InvestmentScenarioRequestDTO {
    propertyIdentifier: PropertyIdentifier;
    useDefaultRequest: boolean;
    investmentScenario?: InvestmentScenarioDTO;
};

export interface InvestmentScenarioDTO {
    mortgageDetails: MortgageDetailsDTO;
    growthProjections: GrowthProjections;
    operatingExpenses: OperatingExpensesDTO;
    rentEstimate: number;
    purchasePrice: number;
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

//------------------------------ Investment Related Response ------------------------------

/**
 * Represents the amount and rate of a financial metric.
 */

// Identifies a property using its address and a Zillow listing URL.
export type PropertyIdentifier = {
    fullAddress: string; // Complete physical address of the property.
    zillowURL: string; // URL to the property's Zillow listing for more details.
};

// Represents additional sources of income from the property besides rent.
export type AdditionalIncomeStreams = {
    parkingFees?: number; // Income from parking facilities, if available.
    laundryServices?: number; // Income from on-site laundry services.
    storageUnitFees?: number; // Income from storage units, if available.
    other?: number; // Any other sources of income not covered above.
};

// Details about the down payment made on the property.
export type DownPaymentBreakdown = {
    downPaymentAmount: number; // The absolute amount of the down payment.
    downPaymentPercentage: number; // The down payment as a percentage of the purchase price.
};

// Breakdown of the initial costs incurred when purchasing the property.
export type InitialCostsBreakdown = {
    totalCosts: number; // Sum of all initial costs.
    breakdown: {
        legalAndProfessionalFees: number; // Costs for legal services, inspections, etc.
        initialRepairCosts: number; // Costs for repairs needed before the property can be rented out.
        closingCosts: number; // Administrative and other fees paid at closing.
        travelingCosts: number; // Costs related to traveling to view/inspect the property.
        otherExpenses: number; // Any other initial costs not categorized above.
    };
};

// Combines mortgage details with recurring property expenses for comprehensive cost analysis.
export type MortgageWithRecurringExpensesBreakdown = {
    totalCosts: number; // Total of mortgage and recurring expenses.
    breakdown: {
        mortgageBreakdown: MortgageBreakdown; // Details of the mortgage.
        recurringExpensesBreakdown: RecurringExpensesBreakdown; // Details of recurring expenses.
    };
};

// Details about PMI, a necessary cost if the down payment is below a certain threshold.
export type PMIDetails = {
    pmiAmount: number; // The monthly PMI payment.
    pmiRate: number; // PMI rate used to calculate the pmiAmount.
    pmiDropoffPoint: number; // Loan-to-value ratio (%) at which PMI is no longer required.
};

// Breakdown of the mortgage, including principal and interest, as well as PMI details if applicable.
export type MortgageBreakdown = {
    mortgageAmount: number; // The total loan amount for the mortgage.
    monthlyPayment: number; // Base monthly mortgage payment, excluding PMI.
    pmiDetails?: PMIDetails; // Optional PMI details, applicable if LTV ratio warrants.
    breakdown?: {
        principalAmount: number; // Portion of monthly payment going toward the loan principal.
        percentTowardsPrincipal: number; // Percentage of monthly payment applied to the principal.
        interestAmount: number; // Portion of monthly payment going toward interest.
        percentTowardsInterest: number; // Percentage of monthly payment applied to interest.
    };
};

// Detailed breakdown of recurring expenses associated with managing and maintaining the property.
export type RecurringExpensesBreakdown = {
    totalCosts: number; // Total of all recurring expenses.
    breakdown: {
        propertyManagementRate: number; // Costs associated with property management services.
        vacancyRate: number; // Costs accounted for potential vacancy periods.
        maintenanceRate: number; // Regular maintenance and repair costs.
        otherExpensesRate: number; // Any other recurring expenses not explicitly mentioned.
        capExReserveRate: number; // Allocation for capital expenditures/reserves.
    };
};

// Breakdown of equity in the property, considering different scenarios.
export type EquityBreakdown = {
    equityAmountWithDownPayment: number; // Equity considering the initial down payment.
    equityAmountWithoutDownPayment: number; // Hypothetical equity without the down payment.
    equityAmountWithAppreciation: number; // Equity considering property appreciation.
    appreciationAmount: number; // Total amount of appreciation.
};

// Implications for taxes, including potential deductions and depreciation benefits.
export type TaxImplications = {
    depreciation: number; // Annual depreciation expense that can be deducted.
    taxDeductions: {
        mortgageInterest?: number; // Deductible mortgage interest expense.
        operatingExpenses?: number; // Deductible operating expenses.
        propertyTaxes?: number; // Deductible property tax expense.
    };
};

// Projections for growth in rent, property value, and taxes.
export type GrowthProjections = {
    annualRentIncreaseRate: number; // Expected annual percentage increase in rent.
    annualAppreciationRate: number; // Expected annual percentage increase in property value.
    annualTaxIncreaseRate?: number; // Expected annual percentage increase in property taxes.
};

// Options for financing the property purchase, including loan terms and conditions.
export type FinancingOption = {
    type: FinancingType; // Type of financing (e.g., conventional, FHA).
    terms: FinancingTerms; // Specific terms of the financing option.
};

// Terms of the financing option, detailing loan amount, interest rate, etc.
export type FinancingTerms = {
    loanAmount: number; // Total loan amount.
    rate: number; // Interest rate of the loan.
    interestType: InterestType; // Type of interest, either fixed or variable
    termInYears: number; // Duration of the loan in years.
    interestOnlyPeriod?: number; // Optional period where only interest payments are made.
    monthlyPayment: number; // Total monthly payment, including principal and interest.
};

// Details of cash flow from the property, including income, expenses, and net amount.
export type CashFlowDetails = {
    totalAmount: number; // Net cash flow after accounting for all expenses and income.
    breakdown: {
        totalExpenses: {
            mortgagePayment: number; // Monthly mortgage payment, including PMI if applicable.
            pmi?: number; // PMI payment listed separately for clarity until it drops off.
            recurringExpensesTotal: number; // Sum of all recurring expenses.
        };
        totalIncome: {
            rent: number; // Monthly rental income.
            // Additional income streams can be added here for total income calculation.
        };
    };
};

// Consolidated cash flow information on a monthly and yearly basis.
export type CashFlow = {
    monthlyCashFlow: CashFlowDetails;
    yearlyCashFlow: CashFlowDetails;
};

// Comprehensive details of the investment metrics for a property.
export interface InvestmentMetricsResponseDTO {
    propertyIdentifier: PropertyIdentifier; // Identifies the property.
    principalAmount: number; // Principal amount of the loan.
    downPaymentAmount: DownPaymentBreakdown; // Details of the down payment.
    initialRentAmount: number; // Starting rent amount.
    ROI: number; // Return on investment percentage.
    capRate: number; // Capitalization rate percentage.
    initialMortgagePayment: number; // Initial mortgage payment amount.
    cashFlow: CashFlow; // Detailed cash flow information.
    initialCosts: InitialCostsBreakdown; // Breakdown of initial costs incurred.
    additionalIncomeStreams: AdditionalIncomeStreams; // Additional income streams from the property.
    financingOptions: FinancingOption[]; // Available financing options.
    growthProjections: GrowthProjections; // Growth projections for rent, value, and taxes.
    recurringExpensesBreakdown: RecurringExpensesBreakdown; // Detailed recurring expenses.
    ammortizationDetails?: AmortizationDetailsDTO[]; // Optional amortization details over time.
};

// Details of amortization for the mortgage, reflecting changes over time.
export interface AmortizationDetailsDTO {
    month: number; // Month number of the amortization schedule.
    year: number; // Year of the amortization schedule.
    remainingBalance: number; // Remaining balance of the mortgage.
    mortgageWithRecurringExpensesBreakdown: MortgageWithRecurringExpensesBreakdown; // Breakdown including mortgage and recurring expenses.
    cashFlowAmount: CashFlow; // Cash flow details associated with this point in time.
    equityBreakdown: EquityBreakdown; // Equity breakdown at this point in time.
};


//------------------------------ ListingDetails related models ------------------------------

export interface ListingDetailsDTO {
    zillowURL: string;
    propertyDetails: PropertyDetailsDTO;
    zillowMarketEstimates: ZillowMarketEstimatesDTO;
    listingPrice: number;
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

