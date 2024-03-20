import { RecurringExpense } from "./recurring.expense.model";

export class OtherExpenses extends RecurringExpense {
   
    getType(): string {
        return OtherExpenses.name;
    }

}