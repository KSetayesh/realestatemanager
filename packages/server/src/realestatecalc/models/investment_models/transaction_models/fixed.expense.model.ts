import { Expense } from "./expense.model";

export abstract class FixedExpense extends Expense {
    isFixedExpense(): boolean {
        return true;
    }

}