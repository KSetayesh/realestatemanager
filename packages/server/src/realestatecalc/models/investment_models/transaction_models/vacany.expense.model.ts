import { RecurringExpense } from "./recurring.expense.model";

export class VacancyExpense extends RecurringExpense {

    getType(): string {
        return VacancyExpense.name;
    }

}