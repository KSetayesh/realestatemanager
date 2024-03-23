import { ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";

export type AmountAndRate = {
    amountValue: ValueAmountInput;
    rateValue: ValueRateInput;
    // growthFrequency: GrowthFrequency;
};

export abstract class Transaction {
    private growthRate: ValueRateInput;
    private amountComparedTo: AmountAndRate;
    private description: string;

    constructor(
        growthRate: ValueRateInput,
        amountComparedTo: AmountAndRate,
        description: string,
    ) {
        this.growthRate = growthRate;
        this.amountComparedTo = amountComparedTo;
        this.description = description;
    }

    abstract getProjectedValue(numberOfYears?: number): number;

    abstract getRate(numberOfYears?: number): number;

    protected getGrowthRate(): number {
        return this.growthRate.rate;
    }

    protected getAmountComparedTo(): AmountAndRate {
        //return this.amountComparedTo.amount;
        return this.amountComparedTo;
    }

    protected getProjectedGrowthOfAmountComparedTo(numberOfYears: number = 0): number {
        const amountComparedToValue: AmountAndRate = this.getAmountComparedTo();
        const rateOfAmountComparedTo: number = amountComparedToValue.rateValue.rate;
        const amountComparedTo: number = amountComparedToValue.amountValue.amount;
        return amountComparedTo * (Math.pow((1 + (rateOfAmountComparedTo / 100)), numberOfYears));
    }

    getDescription(): string {
        return this.description;
    }

}
