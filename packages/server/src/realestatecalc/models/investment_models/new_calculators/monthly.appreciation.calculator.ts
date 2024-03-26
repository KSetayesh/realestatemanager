import { ValueAmountInput, ValueRateInput, GrowthFrequency, isValueAmountInput, ValueInput } from "@realestatemanager/shared";
import { TransactionCalculator } from "./transaction.calculator";
import { Injectable } from "@nestjs/common";

// export class AppreciationCalculator extends TransactionCalculator {
@Injectable()
export class MonthlyAppreciationCalculator extends TransactionCalculator {

    constructor() {
        super(GrowthFrequency.MONTHLY);
    }

    getAmount(valueInput: ValueInput, growthRate: number, numberOfMonths: number = 0): ValueAmountInput {
        if (isValueAmountInput(valueInput)) {
            const getMonthlyAppreciationRate = (growthRate: number): number => {
                // Calculate the equivalent monthly appreciation rate for a 4% annual rate
                const annualAppreciationRate = growthRate / 100;
                return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
            };

            return this.getFutureDatedAmount(valueInput.amount, getMonthlyAppreciationRate(growthRate), numberOfMonths);
        }
        throw new Error('Cannot be rate for MonthlyAppreciationCalculator');
    }

    getRate(rateValue: ValueInput): ValueRateInput {
        // return rateValue;
        throw new Error('Cannot get rate for MonthlyAppreciationCalculator');
    }

}