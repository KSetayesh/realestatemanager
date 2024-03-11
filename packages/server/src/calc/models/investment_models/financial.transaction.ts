import { TransactionsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";
import { Incomes } from "./incomes.model";
import { Expenses } from "./expenses.model";

export class FinancialTransaction implements IDTOConvertible<TransactionsDTO> {

    private incomes: Incomes;
    private expenses: Expenses;

    constructor(incomes: Incomes, expenses: Expenses) {
        this.incomes = incomes;
        this.expenses = expenses;
    }

    getTotalIncomes(): number {
        return this.incomes.getTotalIncomes();
    }

    getTotalExpenses(): number {
        return this.expenses.getTotalExpenses();
    }

    getRentalIncome(): number {
        return this.incomes.getRentalIncome();
    }

    getFixedExpenses(): number {
        return this.expenses.getFixedExpenses();
    }

    getRecurringExpenses(): number {
        return this.expenses.getRecurringExpenses();
    }

    toDTO(): TransactionsDTO {
        return {
            incomes: this.incomes.toDTO(),
            expenses: this.expenses.toDTO(),
        }
    }

}