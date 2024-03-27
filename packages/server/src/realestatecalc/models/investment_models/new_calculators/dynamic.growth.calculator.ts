import { ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";
import { Injectable } from "@nestjs/common";
import { CalculatorType } from "./transaction.calculator";

// export class FixedExpensesCalculator extends TransactionCalculator {
@Injectable()
export class DynamicGrowthCalculator extends ValueDependentTransactionCalculator {

    constructor(
        initialRentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
    ) {
        super(initialRentalAmount, rentalGrowthRate);
    }

    getAmount(initialValue: ValueInput, growthRate: number, numberOfYears: number = 0): ValueAmountInput {
        if (isValueAmountInput(initialValue)) {
            return this.getFutureDatedAmount(initialValue.amount, growthRate, numberOfYears);
        }
        else if (isValueRateInput(initialValue)) {
            const initialAmount = this.baseValue.amount * (initialValue.rate / 100);
            return this.getFutureDatedAmount(initialAmount, growthRate, numberOfYears);
        }

    }

    getRate(initialValue: ValueInput, growthRate: number, numberOfYears: number = 0): ValueRateInput {
        if (isValueAmountInput(initialValue)) {
            const futureDatedAmount = this.getFutureDatedAmount(initialValue.amount, growthRate, numberOfYears).amount;
            const futureDatedRentalAmount = this.getFutureDatedAmount(this.baseValue.amount, this.growthRate.rate, numberOfYears).amount;
            return {
                type: ValueType.RATE,
                rate: (futureDatedRentalAmount / futureDatedAmount) * 100,
            };
        }
        else if (isValueRateInput(initialValue)) {
            return initialValue;
        }

    }

    getCalculatorType(): CalculatorType {
        return CalculatorType.DYNAMIC_GROWTH;
    }


}
