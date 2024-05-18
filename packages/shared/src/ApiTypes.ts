
//------------------------------ Investment Related Requests ------------------------------

import {
    InterestType,
    TransactionKey,
    TransactionType,
    ValueType,
} from './Constants';
import { ListingDetailsResponseDTO } from './ListingTypes';

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
    purchasePrice: ValueAmountInput;
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
    annualInterestRate: ValueRateInput;
    termInYears: number;
    interestType: InterestType;
};

export interface MortgageDetailsRequest extends LoanDetailsRequest {
    downPayment: ValueInput; // Now accepts both amount and rate.
    pmiRate?: ValueRateInput; // Now accepts both amount and rate.
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

export interface TaxImplicationsDTO {
    depreciation: number;
    mortgageInterest: number;
    operatingExpenses: number;
    propertyTaxes?: number;
};

export type TotalAmount = {
    amount: number;
    description: string;
};

export interface TxnDTO {
    key: TransactionKey;
    amount: number;
    percentage: number;
    rateOfGrowth?: number;
    cumulatedAmount?: number;
};

export interface MortgageTxnDTO extends TxnDTO {
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

export interface RecurringFixedExpensesDTO {
    type: TransactionType.FIXED_RECURRING_EXPENSE;
    totalAmount: TotalAmount;
    breakdown: {
        [TransactionKey.PROPERTY_TAX]: TxnDTO;
        [TransactionKey.HOA_FEE]: TxnDTO;
        [TransactionKey.HOME_INSURANCE]: TxnDTO;
    };
};

export interface InitialCostsExpensesDTO {
    type: TransactionType.INITIAL_EXPENSE;
    totalAmount: TotalAmount;
    breakdown: {
        [TransactionKey.DOWN_PAYMENT]: TxnDTO,
        [TransactionKey.CLOSING_COST]: TxnDTO,
        [TransactionKey.INITIAL_REPAIR_COST]: TxnDTO,
        [TransactionKey.LEGAL_AND_PROFESSIONAL_FEES]: TxnDTO,
        [TransactionKey.TRAVELING_COST]: TxnDTO,
        [TransactionKey.OTHER_INITIAL_EXPENSES]: TxnDTO,
    };
};

export interface IncomeStreamsDTO {
    type: TransactionType.INCOME_STREAMS;
    totalAmount: TotalAmount;
    breakdown: {
        [TransactionKey.RENTAL_INCOME]: TxnDTO,
        [TransactionKey.STORAGE_UNIT_FEES]: TxnDTO,
        [TransactionKey.PARKING_FEES]: TxnDTO,
        [TransactionKey.LAUNDRY_SERVICES]: TxnDTO,
        [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: TxnDTO,
    };
}

export interface RecurringOperationalCostsDTO {
    type: TransactionType.OPERATIONAL_RECURRING_EXPENSE;
    totalAmount: TotalAmount;
    breakdown: {
        [TransactionKey.CAP_EX_RESERVE_EXPENSE]: TxnDTO,
        [TransactionKey.MAINTENANCE_EXPENSE]: TxnDTO,
        [TransactionKey.OTHER_EXPENSES]: TxnDTO,
        [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: TxnDTO,
        [TransactionKey.VACANCY_EXPENSE]: TxnDTO,
    };
};

export type MonthlyDateData = {
    dateAsString: string;
    monthMod12: number;
    yearCounter: number;
};

export interface MortgageDTO {
    type: TransactionType.MORTGAGE;
    totalAmount: TotalAmount;
    breakdown: MortgageTxnDTO;
};

export interface FinancingDTO {
    type: TransactionType;
    breakdown: {
        [TransactionKey.PURCHASE_PRICE]: TxnDTO;
        [TransactionKey.LOAN_AMOUNT]: number;
    },
};

export interface MonthlyInvestmentBreakdownDTO {
    appreciation: {
        appreciationRate: number;
        homeValue: number;
    },
    investmentBreakdown: InvestmentBreakdownDTO,
    transactions: {
        expenseAmount: number;
        incomeAmount: number;
        cashFlow: number;
        breakdown: {
            [TransactionType.MORTGAGE]: MortgageDTO;
            [TransactionType.FIXED_RECURRING_EXPENSE]: RecurringFixedExpensesDTO;
            [TransactionType.INCOME_STREAMS]: IncomeStreamsDTO;
            [TransactionType.OPERATIONAL_RECURRING_EXPENSE]: RecurringOperationalCostsDTO;
        }
    }
};

export interface MonthlyInvestmentDetailsDTO {
    monthlyDateData: MonthlyDateData;
    monthlyBreakdown: MonthlyInvestmentBreakdownDTO;
};

export interface InvestmentBreakdownDTO {
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

export interface InitialInvestmentBreakdownDTO {
    investmentBreakdown: InvestmentBreakdownDTO,
    transactions: {
        [TransactionType.FINANCING]: FinancingDTO;
        [TransactionType.MORTGAGE]: MortgageDTO;
        [TransactionType.FIXED_RECURRING_EXPENSE]: RecurringFixedExpensesDTO;
        [TransactionType.INITIAL_EXPENSE]: InitialCostsExpensesDTO;
        [TransactionType.INCOME_STREAMS]: IncomeStreamsDTO;
        [TransactionType.OPERATIONAL_RECURRING_EXPENSE]: RecurringOperationalCostsDTO;
    }
};

export type GrowthProjectionsDTO = {
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

export interface AmortizationBreakdownDTO {
    initialInvestmenDetails: InitialInvestmentBreakdownDTO;
    growthProjections: GrowthProjectionsDTO;
    taxImplications: TaxImplicationsDTO;
    amortizationData: MonthlyInvestmentDetailsDTO[];
};

export interface ListingWithScenariosDTO {
    listingDetails: ListingDetailsResponseDTO;
    metrics: AmortizationBreakdownDTO;
};


//------------------------------ ListingDetails related models ------------------------------

// export interface ListingDetailsDTO {
//     zillowURL: string;
//     propertyDetails: PropertyDetailsDTO;
//     zillowMarketEstimates: ZillowMarketEstimatesDTO;
//     listingPrice: number;
//     dateListed?: string;
//     dateCreated?: string;
//     dateUpdated?: string;
//     numberOfDaysOnMarket?: number;
//     propertyStatus?: PropertyStatus;
//     creationType?: ListingCreationType;
// };

// export type AddressDTO = {
//     fullAddress?: string;
//     state?: State;
//     zipcode?: string;
//     city?: string;
//     county?: string;
//     country?: Country;
//     streetAddress?: string;
//     apartmentNumber?: string;
//     longitude?: number;
//     latitude?: number;
// };

// export interface PropertyDetailsDTO {
//     address?: AddressDTO;
//     schoolRating?: SchoolRatingDTO;
//     // numberOfDaysOnMarket?: number;
//     numberOfBedrooms?: number;
//     numberOfFullBathrooms?: number;
//     numberOfHalfBathrooms?: number;
//     squareFeet?: number;
//     acres?: number;
//     yearBuilt?: number;
//     hasGarage?: boolean;
//     hasPool?: boolean;
//     hasBasement?: boolean;
//     propertyType?: PropertyType;
//     description?: string;
// };

// export interface SchoolRatingDTO {
//     elementarySchoolRating?: number;
//     middleSchoolRating?: number;
//     highSchoolRating?: number;
// };

// export interface ZillowMarketEstimatesDTO {
//     zestimate?: number; // Estimated market value
//     zestimateRange?: {
//         low?: number,
//         high?: number,
//     },
//     zillowRentEstimate?: number; // Estimated rental value
//     zillowMonthlyPropertyTaxAmount?: number;
//     zillowMonthlyHomeInsuranceAmount?: number;
//     zillowMonthlyHOAFeesAmount?: number;
// };

