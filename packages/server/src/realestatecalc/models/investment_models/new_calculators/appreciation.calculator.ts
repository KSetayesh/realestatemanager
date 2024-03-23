import { ValueAmountInput, ValueRateInput, GrowthFrequency } from "@realestatemanager/shared";
import { TransactionCalculator } from "./transaction.calculator";

export class AppreciationCalculator extends TransactionCalculator {

    constructor() {
        super(GrowthFrequency.MONTHLY);
    }

    getAmount(valueInput: ValueAmountInput, growthRate: number, numberOfMonths: number = 0): ValueAmountInput {

        const getMonthlyAppreciationRate = (growthRate: number): number => {
            // Calculate the equivalent monthly appreciation rate for a 4% annual rate
            const annualAppreciationRate = growthRate / 100;
            return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
        };

        return this.getFutureDatedAmount(valueInput.amount, getMonthlyAppreciationRate(growthRate), numberOfMonths);
    }

    getRate(rateValue: ValueRateInput): ValueRateInput {
        return rateValue;
    }

}