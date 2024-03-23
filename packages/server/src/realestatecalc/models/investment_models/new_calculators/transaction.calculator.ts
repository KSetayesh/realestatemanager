import {
    GrowthFrequency,
    ValueAmountInput,
    ValueInput,
    ValueRateInput,
    ValueType
} from "@realestatemanager/shared";

export abstract class TransactionCalculator {

    protected growthFrequency: GrowthFrequency;

    constructor(growthFrequency: GrowthFrequency = GrowthFrequency.YEARLY) {
        this.growthFrequency = growthFrequency;
    }

    abstract getAmount(valueInput: ValueInput, ...args: number[]): ValueAmountInput;

    abstract getRate(valueInput: ValueInput, ...args: number[]): ValueRateInput;

    protected getFutureDatedAmount(
        principal: number,
        growthRate: number,
        numberOfYears: number = 0
    ): ValueAmountInput {

        const rateOfGrowth = 1 + (growthRate / 100);
        return {
            type: ValueType.AMOUNT,
            amount: principal * (Math.pow(rateOfGrowth, numberOfYears))
        };

    }
}

