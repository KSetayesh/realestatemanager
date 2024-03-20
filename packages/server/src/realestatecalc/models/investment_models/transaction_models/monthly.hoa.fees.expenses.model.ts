import { FixedExpense } from "./fixed.expense.model";

export class MonthlyHOAFeesAmount extends FixedExpense {

    getType(): string {
        return MonthlyHOAFeesAmount.name;
    }

}