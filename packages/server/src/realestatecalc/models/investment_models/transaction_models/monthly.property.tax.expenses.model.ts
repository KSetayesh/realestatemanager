import { FixedExpense } from "./fixed.expense.model";

export class MonthlyPropertyTaxAmount extends FixedExpense {
    
    getType(): string {
        return MonthlyPropertyTaxAmount.name;
    }

}