import { ValueType } from "@realestatemanager/shared";

export abstract class Transaction {

    private value: number;
    private valueType: ValueType;
    private growthRate: number;

    constructor(
        value: number,
        valueType = ValueType.AMOUNT,
        growthRate: number = 0,
    ) {
        this.value = value;
        this.valueType = valueType;
        this.growthRate = growthRate;
    }

    abstract isExpense(): boolean;

    abstract getType(): string;

    isRentalIncome(): boolean {
        return false;
    }

    isRecurringExpense(): boolean {
        return false;
    }

    isFixedExpense(): boolean {
        return false;
    }

    isAdditionalIncome(): boolean {
        return false;
    }

    getProjectedAmount(numberOfYears: number = 0): number {
        return this.value * (Math.pow((1 + (this.growthRate / 100)), numberOfYears));
    }

}

