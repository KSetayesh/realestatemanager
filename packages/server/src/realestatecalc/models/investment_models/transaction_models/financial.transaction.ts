import { TransactionsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Incomes } from "./incomes.model";
import { Expenses } from "./expenses.model";

export class FinancialTransaction implements IDTOConvertible<TransactionsDTO> {

    private incomes: Incomes;
    private expenses: Expenses;

    constructor(incomes: Incomes, expenses: Expenses) {
        this.incomes = incomes;
        this.expenses = expenses;
    }

    getTotalIncomes(numberOfYears: number = 0): number {
        return this.incomes.getTotalIncomes(numberOfYears);
    }

    getRentalIncome(numberOfYears: number = 0): number {
        return this.incomes.getRentalIncome(numberOfYears);
    }

    getFixedExpenses(numberOfYears: number = 0): number {
        return this.expenses.getFixedExpenses(numberOfYears);
    }

    getRecurringExpenses(numberOfYears: number = 0): number {
        return this.expenses.getRecurringExpenses(numberOfYears);
    }

    getInitialCosts(): number {
        return this.expenses.getInitialCosts();
    }

    toDTO(): TransactionsDTO {
        return {
            incomes: this.incomes.toDTO(),
            expenses: this.expenses.toDTO(),
        }
    }

}