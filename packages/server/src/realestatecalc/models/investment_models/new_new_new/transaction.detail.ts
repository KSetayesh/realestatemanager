import { FinancialTransactionBreakdown } from "./financial.transaction.breakdown";
import { Transaction } from "./transaction";


export enum TransactionType {
    INITIAL_EXPENSE,
    MORTGAGE_RELATED_EXPENSE,
    RECURRING_EXPENSE,
    INCOME,
    PURCHASE_RELATED,
};

export enum TransactionKey {
    LOAN_AMOUNT = 'Loan Amount',
    PURCHASE_PRICE = 'Purchase Price',

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

interface BaseTransactionDetail {
    key: TransactionKey;
    type: TransactionType;
    amount: number;
    percentage?: number;
    cumulativeAmount?: number;
    rateOfGrowth?: number;
}

interface PurchaseRelatedTransactionDetail extends Omit<BaseTransactionDetail, 'percentage' | 'cumulativeAmount'> { }


export class TransactionDetail {

    private txnMap: Map<TransactionKey, BaseTransactionDetail[]>;
    private financialTransactionBreakdown: FinancialTransactionBreakdown;

    constructor(financialTransactionBreakdown: FinancialTransactionBreakdown) {
        this.txnMap = new Map();
        this.financialTransactionBreakdown = financialTransactionBreakdown;
    }

    private txns = {
        [TransactionType.INITIAL_EXPENSE]: {
            [TransactionKey.DOWN_PAYMENT]: {
                key: TransactionKey.DOWN_PAYMENT,
                type: TransactionType.INITIAL_EXPENSE,
                amount: 0,
                percentage: 0,
            },
            [TransactionKey.LEGAL_AND_PROFESSIONAL_FEES]: {
                key: TransactionKey.LEGAL_AND_PROFESSIONAL_FEES,
                type: TransactionType.INITIAL_EXPENSE,
                amount: 0,
                percentage: 0,
            },
            [TransactionKey.INITIAL_REPAIR_COST]: {
                key: TransactionKey.LEGAL_AND_PROFESSIONAL_FEES,
                type: TransactionType.INITIAL_EXPENSE,
                amount: 0,
                percentage: 0,
            },
            [TransactionKey.CLOSING_COST]: {
                key: TransactionKey.CLOSING_COST,
                type: TransactionType.INITIAL_EXPENSE,
                amount: 0,
                percentage: 0,
            },
            [TransactionKey.OTHER_INITIAL_EXPENSES]: {
                key: TransactionKey.OTHER_INITIAL_EXPENSES,
                type: TransactionType.INITIAL_EXPENSE,
                amount: 0,
                percentage: 0,
            },
        },
        [TransactionType.RECURRING_EXPENSE]: {
            [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: {
                key: TransactionKey.PROPERTY_MANAGEMENT_EXPENSE,
                type: TransactionType.RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
            [TransactionKey.VACANCY_EXPENSE]: {
                key: TransactionKey.VACANCY_EXPENSE,
                type: TransactionType.RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
            [TransactionKey.MAINTENANCE_EXPENSE]: {
                key: TransactionKey.MAINTENANCE_EXPENSE,
                type: TransactionType.RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
            [TransactionKey.OTHER_EXPENSES]: {
                key: TransactionKey.OTHER_EXPENSES,
                type: TransactionType.RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
            [TransactionKey.CAP_EX_RESERVE_EXPENSE]: {
                key: TransactionKey.CAP_EX_RESERVE_EXPENSE,
                type: TransactionType.RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
        },
        [TransactionType.INCOME]: {
            [TransactionKey.RENTAL_INCOME]: {
                key: TransactionKey.RENTAL_INCOME,
                type: TransactionType.INCOME,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.PARKING_FEES]: {
                key: TransactionKey.PARKING_FEES,
                type: TransactionType.INCOME,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.LAUNDRY_SERVICES]: {
                key: TransactionKey.LAUNDRY_SERVICES,
                type: TransactionType.INCOME,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.STORAGE_UNIT_FEES]: {
                key: TransactionKey.STORAGE_UNIT_FEES,
                type: TransactionType.INCOME,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: {
                key: TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS,
                type: TransactionType.INCOME,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
        },
        [TransactionType.MORTGAGE_RELATED_EXPENSE]: {
            [TransactionKey.PROPERTY_TAX]: {
                key: TransactionKey.PROPERTY_TAX,
                type: TransactionType.MORTGAGE_RELATED_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.HOA_FEE]: {
                key: TransactionKey.HOA_FEE,
                type: TransactionType.MORTGAGE_RELATED_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.HOME_INSURANCE]: {
                key: TransactionKey.HOME_INSURANCE,
                type: TransactionType.MORTGAGE_RELATED_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
        },
        [TransactionType.PURCHASE_RELATED]: {
            [TransactionKey.PURCHASE_PRICE]: {
                key: TransactionKey.PURCHASE_PRICE,
                type: TransactionType.PURCHASE_RELATED,
                amount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.LOAN_AMOUNT]: {
                key: TransactionKey.LOAN_AMOUNT,
                type: TransactionType.PURCHASE_RELATED,
                amount: 0,
                percentage: 0,
            },
        }
    };

    setAmortizationYearData(yearNumber: number, isInitial: boolean = false) {
        if (isInitial) {
            this.setDownPayment();
            this.setLegalAndProfessionalFees();
            this.setInititalRepairCostsFees();
            this.setClosingCost();
            this.setOtherInitialExpenses();
        }
        else {
            this.setPropertyManagementExpense(yearNumber);
            this.setVacancyExpense(yearNumber);
            this.setMaintenanceExpense(yearNumber);
            this.setOtherExpense(yearNumber);
            this.setCapExReserveExpense(yearNumber); 
        }
    }

    setDownPayment() {
        const txn: Transaction = this.financialTransactionBreakdown.getDownPaymentTxn();
        return this.setInitialExpense(txn, TransactionKey.DOWN_PAYMENT);
    }

    setLegalAndProfessionalFees() {
        const txn: Transaction = this.financialTransactionBreakdown.getLegalAndProfessionalFeesTxn();
        return this.setInitialExpense(txn, TransactionKey.LEGAL_AND_PROFESSIONAL_FEES);
    }

    setInititalRepairCostsFees() {
        const txn: Transaction = this.financialTransactionBreakdown.getLegalAndProfessionalFeesTxn();
        return this.setInitialExpense(txn, TransactionKey.INITIAL_REPAIR_COST);
    }

    setClosingCost() {
        const txn: Transaction = this.financialTransactionBreakdown.getClosingCostsTxn();
        return this.setInitialExpense(txn, TransactionKey.CLOSING_COST);
    }

    setOtherInitialExpenses() {
        const txn: Transaction = this.financialTransactionBreakdown.getOtherInitialExpensesTxn();
        return this.setInitialExpense(txn, TransactionKey.OTHER_INITIAL_EXPENSES);
    }

    setPropertyManagementExpense(numberOfYears: number = 0) {
        const txn: Transaction = this.financialTransactionBreakdown.getPropertyManagementRateTxn();
        return this.setRecurringExpense(txn, TransactionKey.PROPERTY_MANAGEMENT_EXPENSE, numberOfYears);
    }

    setVacancyExpense(numberOfYears: number = 0) {
        const txn: Transaction = this.financialTransactionBreakdown.getVacancyRateTxn();
        return this.setRecurringExpense(txn, TransactionKey.VACANCY_EXPENSE, numberOfYears);
    }

    setMaintenanceExpense(numberOfYears: number = 0) {
        const txn: Transaction = this.financialTransactionBreakdown.getMaintenanceRateTxn();
        return this.setRecurringExpense(txn, TransactionKey.MAINTENANCE_EXPENSE, numberOfYears);
    }

    setOtherExpense(numberOfYears: number = 0) {
        const txn: Transaction = this.financialTransactionBreakdown.getOtherExpensesRateTxn();
        return this.setRecurringExpense(txn, TransactionKey.OTHER_EXPENSES, numberOfYears);
    }

    setRentalIncome(numberOfYears: number = 0) {
        const txn: Transaction = this.financialTransactionBreakdown.getRentalIncomeTxn();
        return this.setIncome(txn, TransactionKey.RENTAL_INCOME, numberOfYears);
    }

    setCapExReserveExpense(numberOfYears: number = 0) {
        const txn: Transaction = this.financialTransactionBreakdown.getCapExReserveRateTxn();
        return this.setRecurringExpense(txn, TransactionKey.CAP_EX_RESERVE_EXPENSE, numberOfYears);
    }

    private setIncome(transaction: Transaction, txnKey: TransactionKey, numberOfYears: number = 0) {
        this.setTransactionInMap(transaction, txnKey, TransactionType.INCOME, numberOfYears);
    }

    private setRecurringExpense(transaction: Transaction, txnKey: TransactionKey, numberOfYears: number = 0) {
        this.setTransactionInMap(transaction, txnKey, TransactionType.RECURRING_EXPENSE, numberOfYears);
    }

    private setInitialExpense(transaction: Transaction, txnKey: TransactionKey) {
        this.setTransactionInMap(transaction, txnKey, TransactionType.INITIAL_EXPENSE);
    }

    private setTransactionInMap(
        transaction: Transaction,
        txnKey: TransactionKey,
        txnType: TransactionType,
        numberOfYears: number = 0,
    ) {

        if (!this.txnMap.has(txnKey)) {
            this.txnMap.set(txnKey, []);
        }
        // Explicitly assert that the return value is not undefined.
        const listOfTxns: BaseTransactionDetail[] = this.txnMap.get(txnKey)!;
        const txnAmount = transaction.getAmount(numberOfYears).amount;
        const txnPercentage = transaction.getRate(numberOfYears).rate;
        const rateOfGrowth = transaction.getProjectedGrowthRate().rate
        let cumulativeAmount = txnAmount;
        if (listOfTxns.length > 1) {
            cumulativeAmount += listOfTxns[listOfTxns.length - 1].cumulativeAmount ?? 0;
        }

        const transactionDetail: BaseTransactionDetail = {
            key: txnKey,
            type: txnType,
            amount: txnAmount,
            ...(transaction.canBePercetage() && { percentage: txnPercentage }),
            ...(transaction.canBeCumulated() && { cumulativeAmount: cumulativeAmount }),
            ...(transaction.hasRateOfGrowth() && { rateOfGrowth: rateOfGrowth }),
        };

        listOfTxns.push(transactionDetail);
    }

}