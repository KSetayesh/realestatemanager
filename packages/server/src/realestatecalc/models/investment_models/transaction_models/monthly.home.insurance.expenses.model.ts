import { FixedExpense } from "./fixed.expense.model";

export class MonthlyHomeInsuranceAmount extends FixedExpense {

    getType(): string {
        return MonthlyHomeInsuranceAmount.name;
    }

}