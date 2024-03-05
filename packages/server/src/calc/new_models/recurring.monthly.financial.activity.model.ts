import { Expenses } from "./expenses.model";
import { Incomes } from "./incomes.model";

export class RecurringFinancialActivity {
    private incomes: Incomes[];
    private expenses: Expenses[];

    constructor(incomes: Incomes[], expenses: Expenses[]) {
        this.incomes = incomes;
        this.expenses = expenses;
    }

}