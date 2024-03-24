import { FinancialTransactionBreakdown } from "./financial.transaction.breakdown";
import { Transaction } from "./transaction";


export enum TransactionType {
    INITIAL_EXPENSE,
    // MORTGAGE_RELATED_EXPENSE,
    FIXED_RECURRING_EXPENSE,
    OPERATIONAL_RECURRING_EXPENSE,
    INCOME_STREAMS,
    FINANCING,
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

interface PurchaseRelatedTransactionDetail extends Omit<BaseTransactionDetail, 'percentage' | 'cumulativeAmount' | 'rateOfGrowth'> { };


export class TransactionDetail {

    //private txnMap: Map<TransactionKey, BaseTransactionDetail[]>;
    private financialTransactionBreakdown: FinancialTransactionBreakdown;
    private txnList: [] = [];
    constructor(financialTransactionBreakdown: FinancialTransactionBreakdown) {
        // this.txnMap = new Map();
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
        [TransactionType.OPERATIONAL_RECURRING_EXPENSE]: {
            [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: {
                key: TransactionKey.PROPERTY_MANAGEMENT_EXPENSE,
                type: TransactionType.OPERATIONAL_RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
            [TransactionKey.VACANCY_EXPENSE]: {
                key: TransactionKey.VACANCY_EXPENSE,
                type: TransactionType.OPERATIONAL_RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
            [TransactionKey.MAINTENANCE_EXPENSE]: {
                key: TransactionKey.MAINTENANCE_EXPENSE,
                type: TransactionType.OPERATIONAL_RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
            [TransactionKey.OTHER_EXPENSES]: {
                key: TransactionKey.OTHER_EXPENSES,
                type: TransactionType.OPERATIONAL_RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
            [TransactionKey.CAP_EX_RESERVE_EXPENSE]: {
                key: TransactionKey.CAP_EX_RESERVE_EXPENSE,
                type: TransactionType.OPERATIONAL_RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
            },
        },
        [TransactionType.INCOME_STREAMS]: {
            [TransactionKey.RENTAL_INCOME]: {
                key: TransactionKey.RENTAL_INCOME,
                type: TransactionType.INCOME_STREAMS,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.PARKING_FEES]: {
                key: TransactionKey.PARKING_FEES,
                type: TransactionType.INCOME_STREAMS,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.LAUNDRY_SERVICES]: {
                key: TransactionKey.LAUNDRY_SERVICES,
                type: TransactionType.INCOME_STREAMS,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.STORAGE_UNIT_FEES]: {
                key: TransactionKey.STORAGE_UNIT_FEES,
                type: TransactionType.INCOME_STREAMS,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: {
                key: TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS,
                type: TransactionType.INCOME_STREAMS,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
        },
        [TransactionType.FIXED_RECURRING_EXPENSE]: {
            [TransactionKey.PROPERTY_TAX]: {
                key: TransactionKey.PROPERTY_TAX,
                type: TransactionType.FIXED_RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.HOA_FEE]: {
                key: TransactionKey.HOA_FEE,
                type: TransactionType.FIXED_RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.HOME_INSURANCE]: {
                key: TransactionKey.HOME_INSURANCE,
                type: TransactionType.FIXED_RECURRING_EXPENSE,
                amount: 0,
                percentage: 0,
                cumulativeAmount: 0,
                rateOfGrowth: 0,
            },
        },
        [TransactionType.FINANCING]: {
            [TransactionKey.PURCHASE_PRICE]: {
                key: TransactionKey.PURCHASE_PRICE,
                type: TransactionType.FINANCING,
                amount: 0,
                rateOfGrowth: 0,
            },
            [TransactionKey.LOAN_AMOUNT]: {
                key: TransactionKey.LOAN_AMOUNT,
                type: TransactionType.FINANCING,
                amount: 0,
                percentage: 0,
            },
        }
    };

    setAmortizationYearData(yearNumber: number) {
        return {
            [TransactionType.INITIAL_EXPENSE]: {
                [TransactionKey.DOWN_PAYMENT]: this.getDownPayment(),
                [TransactionKey.LEGAL_AND_PROFESSIONAL_FEES]: this.getLegalAndProfessionalFees(),
                [TransactionKey.INITIAL_REPAIR_COST]: this.getInititalRepairCostsFees(),
                [TransactionKey.CLOSING_COST]: this.getClosingCost(),
                [TransactionKey.OTHER_INITIAL_EXPENSES]: this.getOtherInitialExpenses(),
            },
            [TransactionType.OPERATIONAL_RECURRING_EXPENSE]: {
                [TransactionKey.PROPERTY_MANAGEMENT_EXPENSE]: this.getPropertyManagementExpense(yearNumber),
                [TransactionKey.VACANCY_EXPENSE]: this.getVacancyExpense(yearNumber),
                [TransactionKey.MAINTENANCE_EXPENSE]: this.getMaintenanceExpense(yearNumber),
                [TransactionKey.OTHER_EXPENSES]: this.getOtherExpense(yearNumber),
                [TransactionKey.CAP_EX_RESERVE_EXPENSE]: this.getCapExReserveExpense(yearNumber),
            },
            [TransactionType.INCOME_STREAMS]: {
                [TransactionKey.RENTAL_INCOME]: this.getRentalIncome(yearNumber),
                [TransactionKey.PARKING_FEES]: this.getParkingFees(yearNumber),
                [TransactionKey.LAUNDRY_SERVICES]: this.getLaundryService(yearNumber),
                [TransactionKey.STORAGE_UNIT_FEES]: this.getStorageUnitFees(yearNumber),
                [TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS]: this.getOtherAdditionalIncomeStreams(yearNumber),
            },
            [TransactionType.FIXED_RECURRING_EXPENSE]: {
                [TransactionKey.PROPERTY_TAX]: this.getPropertyTax(yearNumber),
                [TransactionKey.HOA_FEE]: this.getHOAFee(yearNumber),
                [TransactionKey.HOME_INSURANCE]: this.getHomeInsurance(yearNumber),
            },
            [TransactionType.FINANCING]: {
                [TransactionKey.PURCHASE_PRICE]: this.getPurchasePrice(yearNumber),
                [TransactionKey.LOAN_AMOUNT]: this.getLoan(),
            }
        };
    }

    getDownPayment(): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getDownPaymentTxn();
        return this.getTransactionInMap(txn);
    }

    getLegalAndProfessionalFees(): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getLegalAndProfessionalFeesTxn();
        return this.getTransactionInMap(txn);
    }

    getInititalRepairCostsFees(): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getLegalAndProfessionalFeesTxn();
        return this.getTransactionInMap(txn);
    }

    getClosingCost(): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getClosingCostsTxn();
        return this.getTransactionInMap(txn);
    }

    getOtherInitialExpenses(): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getOtherInitialExpensesTxn();
        return this.getTransactionInMap(txn);
    }

    getPropertyManagementExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getPropertyManagementRateTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getVacancyExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getVacancyRateTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getMaintenanceExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getMaintenanceRateTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getOtherExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getOtherExpensesRateTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getCapExReserveExpense(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getCapExReserveRateTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getRentalIncome(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getRentalIncomeTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getParkingFees(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getParkingFeesTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getLaundryService(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getLaundryServicesTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getStorageUnitFees(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getStorageUnitFeesTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getOtherAdditionalIncomeStreams(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getStorageUnitFeesTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getPropertyTax(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getPropertyTaxTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getHOAFee(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getHOAFeesTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getHomeInsurance(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getHomeInsuranceTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getPurchasePrice(numberOfYears: number = 0): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getPurchasePriceTxn();
        return this.getTransactionInMap(txn, numberOfYears);
    }

    getLoan(): BaseTransactionDetail {
        const txn: Transaction = this.financialTransactionBreakdown.getLoanTxn();
        return this.getTransactionInMap(txn);
    }

    // private getIncome(transaction: Transaction, txnKey: TransactionKey, numberOfYears: number = 0): BaseTransactionDetail {
    //     return this.getTransactionInMap(transaction, txnKey, TransactionType.INCOME, numberOfYears);
    // }

    // private getRecurringExpense(transaction: Transaction, txnKey: TransactionKey, numberOfYears: number = 0): BaseTransactionDetail {
    //     return this.getTransactionInMap(transaction, txnKey, TransactionType.RECURRING_EXPENSE, numberOfYears);
    // }

    // private getInitialExpense(transaction: Transaction, txnKey: TransactionKey): BaseTransactionDetail {
    //     return this.getTransactionInMap(transaction, txnKey, TransactionType.INITIAL_EXPENSE);
    // }

    private getTransactionInMap(
        transaction: Transaction,
        numberOfYears: number = 0,
    ): BaseTransactionDetail {

        // if (!this.txnMap.has(txnKey)) {
        //     this.txnMap.set(txnKey, []);
        // }
        // Explicitly assert that the return value is not undefined.
        // const listOfTxns: BaseTransactionDetail[] = this.txnMap.get(txnKey)!;
        const txnAmount = transaction.getAmount(numberOfYears).amount;
        const txnPercentage = transaction.getRate(numberOfYears).rate;
        const rateOfGrowth = transaction.getProjectedGrowthRate().rate
        let cumulativeAmount = txnAmount;
        if (this.txnList.length > 1) {
            const previousTransactions = this.txnList[this.txnList.length - 1];

        }
        // if (listOfTxns.length > 1) {
        //     cumulativeAmount += listOfTxns[listOfTxns.length - 1].cumulativeAmount ?? 0;
        // }

        const transactionDetail: BaseTransactionDetail = {
            key: transaction.getTransactionKey(),
            type: transaction.getTransactionType(),
            amount: txnAmount,
            ...(transaction.canBePercetage() && { percentage: txnPercentage }),
            ...(transaction.canBeCumulated() && { cumulativeAmount: cumulativeAmount }),
            ...(transaction.hasRateOfGrowth() && { rateOfGrowth: rateOfGrowth }),
        };
        return transactionDetail;
        // listOfTxns.push(transactionDetail);
    }

}