import { Utility, ValueAmountInput } from "@realestatemanager/shared";
import { MortgageTransaction, Transaction } from "./transaction";
import { TransactionCalculator } from "../new_calculators/transaction.calculator";
import { BaseMortgageTransaction, BaseTransaction, TransactionBreakdown } from "./financial.transaction.breakdown";


export enum TransactionType {
    INITIAL_EXPENSE = 'Initial Expense',
    FIXED_RECURRING_EXPENSE = 'Fixed Recurring Expense',
    OPERATIONAL_RECURRING_EXPENSE = 'Operational Recurring Expense',
    INCOME_STREAMS = 'Income Streams',
    FINANCING = 'Financing',
    MORTGAGE = 'Mortgage',
};

export enum TransactionKey {
    // LOAN_AMOUNT = 'Loan Amount',
    PURCHASE_PRICE = 'Purchase Price',

    MORTGAGE = 'Mortgage',
    // MORTGAGE_INTEREST = 'Mortgage Interest',
    // MORTGAGE_PRINCIPAL = 'Mortgage Principal',
    // MORTGAGE_AMOUNT = 'Mortgage Amount',
    // PMI = 'PMI',

    PROPERTY_TAX = 'Property Tax',
    HOA_FEE = 'Monthly HOA Fee',
    HOME_INSURANCE = 'Monthly Home Insurance',

    RENTAL_INCOME = 'Rental Income',
    PARKING_FEES = 'Parking Fees',
    LAUNDRY_SERVICES = 'Laundry Service',
    STORAGE_UNIT_FEES = 'Storage Unit Fees',
    OTHER_ADDITIONAL_INCOME_STREAMS = 'Other Additional Incomes Streams',

    PROPERTY_MANAGEMENT_EXPENSE = 'Property Management Expense',
    VACANCY_EXPENSE = 'Vacancy Expense',
    MAINTENANCE_EXPENSE = 'Maintenance Expense',
    OTHER_EXPENSES = 'Other Expeneses',
    CAP_EX_RESERVE_EXPENSE = 'Cap Ex Reserve Expense',

    DOWN_PAYMENT = 'Down Payment',
    LEGAL_AND_PROFESSIONAL_FEES = 'Legal And Professional Fees',
    INITIAL_REPAIR_COST = 'Initial Repair Costs',
    CLOSING_COST = 'Closing Costs',
    TRAVELING_COST = 'Traveling Costs',
    OTHER_INITIAL_EXPENSES = 'Other Initial Expenses',
};


export interface BaseTransactionDetail {
    key: TransactionKey;
    // type: TransactionType;
    amount: number;
    percentage?: number;
    cumulativeAmount?: number;
    rateOfGrowth?: number;
};

export interface InitialBaseMortgageTransactionDetail extends BaseTransactionDetail {
    // balanceAfterPayment: number;
    loanAmount: number;
    hasPMI: boolean;
    pmiAmount?: number;
    pmiRate?: number;
};

export interface BaseMortgageTransactionDetail extends InitialBaseMortgageTransactionDetail {
    balanceAfterPayment: number;
    principalAmountForPayment: number;
    interestAmountForPayment: number;
    percentageOfInterest: number;
    percentageOfPrincipal: number;
    // hasPMI: boolean;
    // pmiAmount?: number;
    // pmiRate?: number;
    // loanAmount: number;
};



// interface MortgageRelatedDetail extends BaseTransactionDetail { // Omit<BaseTransactionDetail, 'interestAmount'> {
//     // interestAmount: number; // Assuming you are adding this to differentiate mortgage interest payments

//     interestAmount: number;
// };

interface TransactionCategoryDetail {
    totalAmount: number;
    // description: string;
    type: TransactionType;
    breakdown: { [key in TransactionKey]?: BaseTransactionDetail }; // breakdown: Record<TransactionKey, BaseTransactionDetail>; // | MortgageRelatedDetail>;
};

// interface FinancingCategoryDetail extends Omit<TransactionCategoryDetail, 'breakdown'> {
//     breakdown: {
//         [key in TransactionKey]?: BaseTransactionDetail; // Existing transaction keys
//     } & {
//         mortgageInterest: BaseTransactionDetail; // Interest part of mortgage payments
//         mortgagePrincipal: BaseTransactionDetail; // Principal part of mortgage payments
//         mortgageAmount: BaseTransactionDetail; // Total mortgage amount
//         pmiAmount: BaseTransactionDetail; // Total mortgage amount
//     };
// };

export type AmortizationYearData = {
    [P in TransactionType]: TransactionCategoryDetail;
};

//interface PurchaseRelatedTransactionDetail extends Omit<BaseTransactionDetail, 'percentage' | 'cumulativeAmount' | 'rateOfGrowth'> { };


export class TransactionDetail {

    private initialExpenseDescription = `Down Payment Amount + \n 
                                    Legal And Professional Fees + \n 
                                    Initial Repair Costs + \n 
                                    Closing Costs + \n 
                                    Other Initial Expenses \n`;

    private operationalRecurringExpenseDescription = `Property Management Expensive + \n
                                                Vacancy Expense + \n
                                                Maintenance Expense + \n
                                                Other Expenses + \n
                                                Cap Ex Reserve Expense \n`;

    private incomeStreamsDescription = `Rental Income + \n
                                    Parking Fees + \n
                                    Laundry Services + \n
                                    Storage Unit Fees + \n
                                    Other Additional Income Streams \n`;

    private fixedRecurringExpenseDescription = `Property Tax + \n
                                            HOA Fee + \n
                                            Home Insurance \n`;

    private financingDescription = `Purchase Price + \n
                                Loan Amount \n`;

    private txnList: [] = [];
    // private financialTransactionBreakdown: FinancialTransactionBreakdown;
    private txnBreakdown: TransactionBreakdown<TransactionCalculator>;
    // private mortgageTransactionBreakdown: MortgageTransactionBreakdown;


    constructor(
        txnBreakdown: TransactionBreakdown<TransactionCalculator>,
        // mortgageTransactionBreakdown: MortgageTransactionBreakdown
    ) {
        this.txnBreakdown = txnBreakdown;
        // this.mortgageTransactionBreakdown = mortgageTransactionBreakdown;
    }



    getPurchaseData(): any {
        return {
            [TransactionType.FINANCING]: {
                type: TransactionType.FINANCING,
                totalAmount: Utility.round(this.getTotalFinancingAmount().amount),
                breakdown: {
                    [TransactionKey.PURCHASE_PRICE]: this.getPurchasePrice(),
                },
            },
            [TransactionType.MORTGAGE]: {
                type: TransactionType.MORTGAGE,
                totalAmount: Utility.round(this.getTotalFinancingAmount().amount),
                breakdown: {
                    [TransactionKey.MORTGAGE]: this.getInitialMortgage(),
                },
            },
            [TransactionType.INITIAL_EXPENSE]: {
                type: TransactionType.INITIAL_EXPENSE,
                totalAmount: Utility.round(this.getTotalInitialExpenses().amount),
                breakdown: {
                    [TransactionKey.DOWN_PAYMENT]: this.getDownPayment(),
                    [TransactionKey.LEGAL_AND_PROFESSIONAL_FEES]: this.getLegalAndProfessionalFees(),
                    [TransactionKey.INITIAL_REPAIR_COST]: this.getInititalRepairCostsFees(),
                    [TransactionKey.CLOSING_COST]: this.getClosingCost(),
                    [TransactionKey.OTHER_INITIAL_EXPENSES]: this.getOtherInitialExpenses(),
                },
            },
        };
    }

    getAmortizationYearData(yearNumber: number): any { //AmortizationYearData {
        return {
            // [TransactionType.INITIAL_EXPENSE]: {
            //     totalAmount: Utility.round(this.getTotalInitialExpenses().amount),
            //     description: this.initialExpenseDescription,
            //     breakdown: {
            //         [TransactionKey.DOWN_PAYMENT]: this.getDownPayment(),
            //         [TransactionKey.LEGAL_AND_PROFESSIONAL_FEES]: this.getLegalAndProfessionalFees(),
            //         [TransactionKey.INITIAL_REPAIR_COST]: this.getInititalRepairCostsFees(),
            //         [TransactionKey.CLOSING_COST]: this.getClosingCost(),
            //         [TransactionKey.OTHER_INITIAL_EXPENSES]: this.getOtherInitialExpenses(),
            //     },
            // },
            [TransactionType.OPERATIONAL_RECURRING_EXPENSE]: {
                type: TransactionType.OPERATIONAL_RECURRING_EXPENSE,
                totalAmount: Utility.round(this.getTotalOperationalRecurringExpenses(yearNumber).amount),
                // description: this.operationalRecurringExpenseDescription,
                breakdown: {
                    [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: this.getPropertyManagementExpense(yearNumber),
                    [TransactionKey.VACANCY_EXPENSE]: this.getVacancyExpense(yearNumber),
                    [TransactionKey.MAINTENANCE_EXPENSE]: this.getMaintenanceExpense(yearNumber),
                    [TransactionKey.OTHER_EXPENSES]: this.getOtherExpense(yearNumber),
                    [TransactionKey.CAP_EX_RESERVE_EXPENSE]: this.getCapExReserveExpense(yearNumber),
                },
            },
            [TransactionType.INCOME_STREAMS]: {
                type: TransactionType.INCOME_STREAMS,
                totalAmount: Utility.round(this.getTotalIncomesAmount(yearNumber).amount),
                // description: this.incomeStreamsDescription,
                breakdown: {
                    [TransactionKey.RENTAL_INCOME]: this.getRentalIncome(yearNumber),
                    [TransactionKey.PARKING_FEES]: this.getParkingFees(yearNumber),
                    [TransactionKey.LAUNDRY_SERVICES]: this.getLaundryService(yearNumber),
                    [TransactionKey.STORAGE_UNIT_FEES]: this.getStorageUnitFees(yearNumber),
                    [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: this.getOtherAdditionalIncomeStreams(yearNumber),
                },
            },
            [TransactionType.FIXED_RECURRING_EXPENSE]: {
                type: TransactionType.FIXED_RECURRING_EXPENSE,
                totalAmount: Utility.round(this.getTotalFixedRecurringExpenses(yearNumber).amount),
                // description: this.fixedRecurringExpenseDescription,
                breakdown: {
                    [TransactionKey.PROPERTY_TAX]: this.getPropertyTax(yearNumber),
                    [TransactionKey.HOA_FEE]: this.getHOAFee(yearNumber),
                    [TransactionKey.HOME_INSURANCE]: this.getHomeInsurance(yearNumber),
                },
            },
            [TransactionType.MORTGAGE]: {
                type: TransactionType.MORTGAGE,
                totalAmount: Utility.round(this.getTotalFinancingAmount(yearNumber).amount),
                // description: this.financingDescription,
                breakdown: {
                    [TransactionKey.MORTGAGE]: this.getMortgage(yearNumber)
                    // [TransactionKey.MORTGAGE_AMOUNT]: this.getMortgageAmount(),
                    // [TransactionKey.MORTGAGE_PRINCIPAL]: this.getMortgagePrincipal(),
                    // [TransactionKey.MORTGAGE_INTEREST]: this.getMortgageInterest(),
                    // [TransactionKey.PMI]: this.getPMI(),
                },
            },
            [TransactionType.FINANCING]: {
                type: TransactionType.FINANCING,
                totalAmount: Utility.round(this.getTotalFinancingAmount(yearNumber).amount),
                // description: this.financingDescription,
                breakdown: {
                    // [TransactionKey.LOAN_AMOUNT]: this.getLoan(),
                    [TransactionKey.PURCHASE_PRICE]: this.getPurchasePrice(yearNumber),
                },
            },
        };
    }

    getTotalFinancingAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.txnBreakdown.getTotalFinancingAmount(numberOfYears);
    }

    getTotalFixedRecurringExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.txnBreakdown.getTotalFixedRecurringExpenses(numberOfYears);
    }

    getTotalIncomesAmount(numberOfYears: number = 0): ValueAmountInput {
        return this.txnBreakdown.getTotalIncomesAmount(numberOfYears);
    }

    getTotalInitialExpenses(): ValueAmountInput {
        return this.txnBreakdown.getTotalInitialExpenses();
    }

    getTotalOperationalRecurringExpenses(numberOfYears: number = 0): ValueAmountInput {
        return this.txnBreakdown.getTotalOperationalRecurringExpenses(numberOfYears);
    }

    getDownPayment(): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getDownPaymentTxn();
        return this.createBaseTransactionDetail(txn);
    }

    getLegalAndProfessionalFees(): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getLegalAndProfessionalFeesTxn();
        return this.createBaseTransactionDetail(txn);
    }

    getInititalRepairCostsFees(): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getLegalAndProfessionalFeesTxn();
        return this.createBaseTransactionDetail(txn);
    }

    getClosingCost(): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getClosingCostsTxn();
        return this.createBaseTransactionDetail(txn);
    }

    getOtherInitialExpenses(): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getOtherInitialExpensesTxn();
        return this.createBaseTransactionDetail(txn);
    }

    getPropertyManagementExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getPropertyManagementRateTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getVacancyExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getVacancyRateTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getMaintenanceExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getMaintenanceRateTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getOtherExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getOtherExpensesRateTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getCapExReserveExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getCapExReserveRateTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getRentalIncome(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getRentalIncomeTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getParkingFees(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getParkingFeesTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getLaundryService(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getLaundryServicesTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getStorageUnitFees(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getStorageUnitFeesTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getOtherAdditionalIncomeStreams(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getStorageUnitFeesTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getPropertyTax(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getPropertyTaxTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getHOAFee(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getHOAFeesTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getHomeInsurance(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getHomeInsuranceTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    getPurchasePrice(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: BaseTransaction = this.txnBreakdown.getPurchasePriceTxn();
        return this.createBaseTransactionDetail(txn, numberOfYears);
    }

    // getLoan(): BaseTransactionDetail {
    //     const txn: BaseTransaction = this.txnBreakdown.getLoanTxn();
    //     return this.getTransactionInMap(txn);
    // }

    getInitialMortgage(): InitialBaseMortgageTransactionDetail {
        const txn: BaseMortgageTransaction = this.txnBreakdown.getMortgageTxn();
        if (txn instanceof MortgageTransaction) {
            return txn.createInitialBaseTransactionDetail(this.txnList);
        }
        throw Error('Txn is not a Mortgage txn');
    }

    getMortgage(numberOfYears: number = 0): BaseMortgageTransactionDetail {
        const txn: BaseMortgageTransaction = this.txnBreakdown.getMortgageTxn();
        if (txn instanceof MortgageTransaction) {
            return txn.createBaseTransactionDetail(this.txnList, numberOfYears);
        }
        throw Error('Txn is not a Mortgage txn');
    };

    private createBaseTransactionDetail(
        transaction: BaseTransaction,
        numberOfYears: number = 0,
    ): BaseTransactionDetail {
        return transaction.createBaseTransactionDetail(this.txnList, numberOfYears);
    }


}