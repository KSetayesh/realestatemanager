
//------------------------------ Investment Related Requests ------------------------------

import {
    Filter,
    InterestType,
    TransactionKey,
    TransactionType,
    ValueType,
} from './Constants';
import { CreateFilteredPropertyListRequest } from './FilterPropertyListApiTypes';
import { ListingDetailsResponseDTO } from './ListingTypes';

// Defines the base structure for input that can either be a rate or an amount
export interface ValueInputBase {
    type: ValueType;
};

// Structure for specifying an absolute amount
export interface ValueAmountInput extends ValueInputBase {
    type: ValueType.AMOUNT;
    amount: number; // The fixed amount in dollars
};

// Structure for specifying a rate (as a percentage)
export interface ValueRateInput extends ValueInputBase {
    // growthFrequency: GrowthFrequency;
    type: ValueType.RATE;
    rate: number; // The rate as a percentage of some base value
};

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

export interface CreateInvestmentScenarioRequest {
    propertyIdentifier: PropertyIdentifier;
    useDefaultRequest: boolean;
    investmentDetails?: CreateInvestmentDetailsRequest;
};

export interface CreateGetAllPropertiesRequest {
    investmentScenarioRequest?: CreateInvestmentScenarioRequest,
    filteredPropertyListRequest?: CreateFilteredPropertyListRequest,
};

export interface CreateInvestmentDetailsRequest {
    mortgageDetails: CreateMortgageDetailsRequest;
    operatingExpenses: CreateOperatingExpensesRequest;
    rentEstimate: ValueAmountInput;
    purchasePrice: ValueAmountInput;
    growthProjections?: CreateGrowthProjectionsRequest;
    additionalIncomeStreams?: CreateAdditionalIncomeStreamsRequest;
    taxImplications?: CreateTaxImplicationsRequest;
};

export interface CreateTaxImplicationsRequest {
    depreciation: number; // Annual depreciation expense that can be deducted.
    mortgageInterest?: number; // Deductible mortgage interest expense.
    operatingExpenses?: number; // Deductible operating expenses.
    propertyTaxes?: number; // Deductible property tax expense.
};

// Represents additional sources of income from the property besides rent.
export type CreateAdditionalIncomeStreamsRequest = {
    parkingFees?: ValueAmountInput; // Income from parking facilities, if available.
    laundryServices?: ValueAmountInput; // Income from on-site laundry services.
    storageUnitFees?: ValueAmountInput; // Income from storage units, if available.
    other?: ValueAmountInput; // Any other sources of income not covered above.
};

export type CreateGrowthProjectionsRequest = {
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

export interface CreateLoanDetailsRequest {
    annualInterestRate: ValueRateInput;
    termInYears: number;
    interestType: InterestType;
};

export interface CreateMortgageDetailsRequest extends CreateLoanDetailsRequest {
    downPayment: ValueInput; // Now accepts both amount and rate.
    pmiRate?: ValueRateInput; // Now accepts both amount and rate.
    pmiDropoffPoint?: number;
    monthlyPropertyTax?: ValueInput; // Now accepts both amount and rate.
    monthlyHomeInsuranceAmount?: ValueInput; // Now accepts both amount and rate.
    monthlyHOAFeesAmount?: ValueInput; // Now accepts both amount and rate.
};

export interface CreateOperatingExpensesRequest {
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

export interface TaxImplicationsResponseDTO {
    depreciation: number;
    mortgageInterest: number;
    operatingExpenses: number;
    propertyTaxes?: number;
};

export type TotalAmount = {
    amount: number;
    description: string;
};

export interface TxnResponseDTO {
    key: TransactionKey;
    amount: number;
    percentage: number;
    rateOfGrowth?: number;
    cumulatedAmount?: number;
};

export interface MortgageTxnResponseDTO extends TxnResponseDTO {
    interestType: InterestType;
    termLength: number;
    mortgageAmount: number;
    loanAmount: number;
    balanceAfterPayment: number;
    principalAmountForPayment: number;
    interestAmountForPayment: number;
    totalInterestPaid: number;
    totalPrincipalPaid: number;
    percentageOfInterest: number;
    percentageOfPrincipal: number;
    hasPMI: boolean;
    pmiAmount: number;
    pmiRate: number;
    pmiDropOffPoint: number;
};

export interface RecurringFixedExpensesResponseDTO {
    type: TransactionType.FIXED_RECURRING_EXPENSE;
    totalAmount: TotalAmount;
    breakdown: {
        [TransactionKey.PROPERTY_TAX]: TxnResponseDTO;
        [TransactionKey.HOA_FEE]: TxnResponseDTO;
        [TransactionKey.HOME_INSURANCE]: TxnResponseDTO;
    };
};

export interface InitialCostsExpensesResponseDTO {
    type: TransactionType.INITIAL_EXPENSE;
    totalAmount: TotalAmount;
    breakdown: {
        [TransactionKey.DOWN_PAYMENT]: TxnResponseDTO,
        [TransactionKey.CLOSING_COST]: TxnResponseDTO,
        [TransactionKey.INITIAL_REPAIR_COST]: TxnResponseDTO,
        [TransactionKey.LEGAL_AND_PROFESSIONAL_FEES]: TxnResponseDTO,
        [TransactionKey.TRAVELING_COST]: TxnResponseDTO,
        [TransactionKey.OTHER_INITIAL_EXPENSES]: TxnResponseDTO,
    };
};

export interface IncomeStreamsResponseDTO {
    type: TransactionType.INCOME_STREAMS;
    totalAmount: TotalAmount;
    breakdown: {
        [TransactionKey.RENTAL_INCOME]: TxnResponseDTO,
        [TransactionKey.STORAGE_UNIT_FEES]: TxnResponseDTO,
        [TransactionKey.PARKING_FEES]: TxnResponseDTO,
        [TransactionKey.LAUNDRY_SERVICES]: TxnResponseDTO,
        [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: TxnResponseDTO,
    };
}

export interface RecurringOperationalCostsResponseDTO {
    type: TransactionType.OPERATIONAL_RECURRING_EXPENSE;
    totalAmount: TotalAmount;
    breakdown: {
        [TransactionKey.CAP_EX_RESERVE_EXPENSE]: TxnResponseDTO,
        [TransactionKey.MAINTENANCE_EXPENSE]: TxnResponseDTO,
        [TransactionKey.OTHER_EXPENSES]: TxnResponseDTO,
        [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: TxnResponseDTO,
        [TransactionKey.VACANCY_EXPENSE]: TxnResponseDTO,
    };
};

export type MonthlyDateData = {
    dateAsString: string;
    monthMod12: number;
    yearCounter: number;
};

export interface MortgageResponseDTO {
    type: TransactionType.MORTGAGE;
    totalAmount: TotalAmount;
    breakdown: MortgageTxnResponseDTO;
};

export interface FinancingResponseDTO {
    type: TransactionType;
    breakdown: {
        [TransactionKey.PURCHASE_PRICE]: TxnResponseDTO;
        [TransactionKey.LOAN_AMOUNT]: number;
    },
};

export interface MonthlyInvestmentBreakdownResponseDTO {
    appreciation: {
        appreciationRate: number;
        homeValue: number;
    },
    investmentBreakdown: InvestmentBreakdownResponseDTO,
    transactions: {
        expenseAmount: number;
        incomeAmount: number;
        cashFlow: number;
        breakdown: {
            [TransactionType.MORTGAGE]: MortgageResponseDTO;
            [TransactionType.FIXED_RECURRING_EXPENSE]: RecurringFixedExpensesResponseDTO;
            [TransactionType.INCOME_STREAMS]: IncomeStreamsResponseDTO;
            [TransactionType.OPERATIONAL_RECURRING_EXPENSE]: RecurringOperationalCostsResponseDTO;
        }
    }
};

export interface MonthlyInvestmentDetailsResponseDTO {
    monthlyDateData: MonthlyDateData;
    monthlyBreakdown: MonthlyInvestmentBreakdownResponseDTO;
};

export interface InvestmentBreakdownResponseDTO {
    NOI: number;
    accumulatedNOI: number;
    capRate: number;
    ROI: number;
    cashOnCashReturn: number;
    monthlyNetIncome: number;
    accumulatedNetIncome: number;
    monthlyCashFlow: number;
    yearlyCashFlow: number;
    accumulatedCashFlow: number;
    equityAmount: number;
};

export interface InitialInvestmentBreakdownResponseDTO {
    investmentBreakdown: InvestmentBreakdownResponseDTO,
    transactions: {
        [TransactionType.FINANCING]: FinancingResponseDTO;
        [TransactionType.MORTGAGE]: MortgageResponseDTO;
        [TransactionType.FIXED_RECURRING_EXPENSE]: RecurringFixedExpensesResponseDTO;
        [TransactionType.INITIAL_EXPENSE]: InitialCostsExpensesResponseDTO;
        [TransactionType.INCOME_STREAMS]: IncomeStreamsResponseDTO;
        [TransactionType.OPERATIONAL_RECURRING_EXPENSE]: RecurringOperationalCostsResponseDTO;
    }
};

export type GrowthProjectionsResponseDTO = {
    annualAppreciationRate: number;
    annualTaxIncreaseRate?: number;
    annualHomeInsuranceIncreaseRate?: number;
    annualHOAFeesIncreaseRate?: number;
    annualRentIncreaseRate: number;
    parkingFeesIncreaseRate?: number; // ValueAmountInput; // Income from parking facilities, if available.
    laundryServicesIncreaseRate?: number; //ValueAmountInput; // Income from on-site laundry services.
    storageUnitFeesIncreaseRate?: number; //ValueAmountInput; // Income from storage units, if available.
    otherAdditionalIncomeStreamsIncreaseRate?: number;
};

export interface AmortizationBreakdownResponseDTO {
    initialInvestmenDetails: InitialInvestmentBreakdownResponseDTO;
    growthProjections: GrowthProjectionsResponseDTO;
    taxImplications: TaxImplicationsResponseDTO;
    amortizationData: MonthlyInvestmentDetailsResponseDTO[];
};

export interface ListingWithScenariosResponseDTO {
    listingDetails: ListingDetailsResponseDTO;
    metrics: AmortizationBreakdownResponseDTO;
};


