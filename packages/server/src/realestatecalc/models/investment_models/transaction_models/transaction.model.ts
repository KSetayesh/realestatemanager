import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";

export abstract class Transaction {
    private amountComparedTo: ValueAmountInput;
    private growthRate: ValueRateInput;
    private description: string;

    constructor(
        amountComparedTo: ValueAmountInput,
        growthRate: ValueRateInput,
        description: string
    ) {
        this.amountComparedTo = amountComparedTo;
        this.growthRate = growthRate;
        this.description = description;
    }

    abstract getProjectedValue(numberOfYears?: number): number;

    abstract getRate(numberOfYears?: number): number;

    protected getGrowthRate(): number {
        return this.growthRate.rate;
    }

    protected getAmountComparedTo(): number {
        return this.amountComparedTo.amount;
    }

    getDescription(): string {
        return this.description;
    }

}
