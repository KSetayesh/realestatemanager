import { ValueType } from "@realestatemanager/shared";
import { Expense } from "./expense.model";
import { RentalIncome } from "./rental.income.model";

export abstract class RecurringExpense extends Expense {

    private percentageOf: RentalIncome;

    constructor(value: number, percentageOf: RentalIncome) {
        super(value, ValueType.RATE);
        this.percentageOf = percentageOf;
    }

    isRecurringExpense(): boolean {
        return true;
    }

    getProjectedAmount(numberOfYears: number = 0): number {
        return this.percentageOf.getProjectedAmount(numberOfYears) * (this.getRate() / 100);
    }

    getRate(): number {
        return super.getProjectedAmount();
    }

}