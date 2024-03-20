import { RecurringExpense } from "./recurring.expense.model";

export class MaintenanceExpense extends RecurringExpense {

    getType(): string {
        return MaintenanceExpense.name;
    }

}