import { RecurringExpense } from "./recurring.expense.model";

export class PropertyManagementExpense extends RecurringExpense {

    getType(): string {
        return PropertyManagementExpense.name;
    }

}