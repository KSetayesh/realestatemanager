import { GrowthFrequency, ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";
import { Injectable } from "@nestjs/common";
import { CalculatorType } from "./transaction.calculator";

// export class InititalCostsCalculator extends TransactionCalculator {
@Injectable()
export class DirectValueCalculator extends ValueDependentTransactionCalculator {

    constructor(initialPurchasePrice: ValueAmountInput) {
        super(initialPurchasePrice, undefined, GrowthFrequency.NONE);
    }

    getAmount(initialValue: ValueInput): ValueAmountInput {
        if (isValueAmountInput(initialValue)) {
            return initialValue;
        }
        else if (isValueRateInput(initialValue)) {
            return {
                type: ValueType.AMOUNT,
                amount: this.baseValue.amount * (initialValue.rate / 100),
            };
        }

    }

    getRate(initialValue: ValueInput): ValueRateInput {
        if (isValueAmountInput(initialValue)) {
            return {
                type: ValueType.RATE,
                rate: (initialValue.amount / this.baseValue.amount) * 100,
            };
        }
        else if (isValueRateInput(initialValue)) {
            return initialValue;
        }

    }

    getCalculatorType(): CalculatorType {
        return CalculatorType.DIRECT_VALUE;
    }


}

