import { Expenses } from "./expenses.model";
import { Incomes } from "./incomes.model";

enum FinancialActivity {
    RENT_INCOME,
    ADDITIONAL_INCOME,
    RECURRING_EXPENSES,
    FIXED_EXPENSES,
}

export class RecurringFinancialActivity {
    private incomes: { FinancialActivity: Incomes }; // Incomes[];
    private expenses: { FinancialActivity: Expenses };

    constructor(incomes: { FinancialActivity: Incomes }, expenses: { FinancialActivity: Expenses }) {
        this.incomes = incomes;
        this.expenses = expenses;
    }

    getRentalIncome(): number {
        return this.incomes[FinancialActivity.RENT_INCOME].totalIncomes();
    }

    getFixedExpenses(): number {
        return this.expenses[FinancialActivity.FIXED_EXPENSES].totalExpenses();
    }

    getRecurringExpenses(): number {
        const getAmount = (rate: number): number => {
            return this.getRentalIncome() * (rate / 100);
        };

        const getRecurringExpenseRates = (): number => {
            return this.expenses[FinancialActivity.RECURRING_EXPENSES].totalExpenses();
        };

        return getAmount(getRecurringExpenseRates());

        // const propertyManagementAmount = getAmount(this.getPropertyManagementRate());
        // const vacancyAmount = getAmount(this.getVacancyRate());
        // const maintenanceAmount = getAmount(this.getMaintenanceRate());
        // const otherExpensesAmount = getAmount(this.getOtherExpensesRate());
        // const capExReserveAmount = getAmount(this.getCapExReserveRate());

        // const totalCosts = propertyManagementAmount + vacancyAmount + maintenanceAmount + otherExpensesAmount + capExReserveAmount;

    }

}