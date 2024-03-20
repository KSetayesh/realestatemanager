import { RecurringExpense } from "./recurring.expense.model";

export class CapitalExpenditureReserveExpenses extends RecurringExpense {

    getType(): string {
        return CapitalExpenditureReserveExpenses.name;
    }

}