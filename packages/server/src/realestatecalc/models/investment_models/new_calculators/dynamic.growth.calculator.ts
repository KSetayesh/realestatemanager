import { ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { TransactionCalculator } from "./transaction.calculator";

// export class FixedExpensesCalculator extends TransactionCalculator {
export class DynamicGrowthCalculator extends TransactionCalculator {

    private rentalGrowthRate: ValueRateInput;
    private inititalRentalAmount: ValueAmountInput;

    constructor(
        rentalGrowthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
    ) {
        super();
        this.rentalGrowthRate = rentalGrowthRate;
        this.inititalRentalAmount = inititalRentalAmount;
    }

    getAmount(initialValue: ValueInput, growthRate: number, numberOfYears: number = 0): ValueAmountInput {
        if (isValueAmountInput(initialValue)) {
            return this.getFutureDatedAmount(initialValue.amount, growthRate, numberOfYears);
        }
        else if (isValueRateInput(initialValue)) {
            const initialAmount = this.inititalRentalAmount.amount * (initialValue.rate / 100);
            return this.getFutureDatedAmount(initialAmount, growthRate, numberOfYears);
        }

    }

    getRate(initialValue: ValueInput, growthRate: number, numberOfYears: number = 0): ValueRateInput {
        if (isValueAmountInput(initialValue)) {
            const futureDatedAmount = this.getFutureDatedAmount(initialValue.amount, growthRate, numberOfYears).amount;
            const futureDatedRentalAmount = this.getFutureDatedAmount(this.inititalRentalAmount.amount, this.rentalGrowthRate.rate, numberOfYears).amount;
            return {
                type: ValueType.RATE,
                rate: (futureDatedRentalAmount / futureDatedAmount) * 100,
            };
        }
        else if (isValueRateInput(initialValue)) {
            return initialValue;
        }

    }

}
