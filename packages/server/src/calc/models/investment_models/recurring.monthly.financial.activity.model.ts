import { Expenses, Incomes, Transaction } from "./transaction.model";

export enum FinancialActivity {
    RENT_INCOME,
    ADDITIONAL_INCOME,
    RECURRING_EXPENSES,
    FIXED_EXPENSES,
};

export type FinancialActivityMap = {
    [key in FinancialActivity]: Transaction;
};

export class RecurringFinancialActivity {

    private transactionsMap: FinancialActivityMap;

    constructor(transactionsMap: FinancialActivityMap) {
        this.transactionsMap = transactionsMap;
    }

    getTotalIncomes(): number {
        let total = 0;
        Object.entries(this.transactionsMap).forEach(([key, transaction]) => {
            if (transaction.isIncome()) {
                total += (transaction as Incomes).totalIncomes();
            }
        });
        return total;
    }

    getTotalExpenses(): number {
        let total = 0;
        Object.entries(this.transactionsMap).forEach(([key, transaction]) => {
            if (transaction.isExpense()) {
                total += (transaction as Expenses).totalExpenses();
            }
        });
        return total;
    }

    getRentalIncome(): number {
        return (this.transactionsMap[FinancialActivity.RENT_INCOME] as Incomes).totalIncomes();
    }

    getFixedExpenses(): number {
        return (this.transactionsMap[FinancialActivity.FIXED_EXPENSES] as Expenses).totalExpenses();
    }

    getRecurringExpenses(): number {
        const getAmount = (rate: number): number => {
            return this.getRentalIncome() * (rate / 100);
        };

        const getRecurringExpenseRates = (): number => {
            return (this.transactionsMap[FinancialActivity.RECURRING_EXPENSES] as Expenses).totalExpenses();
        };

        return getAmount(getRecurringExpenseRates());

    }

}