import { GrowthFrequency, ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";

// export class InititalCostsCalculator extends TransactionCalculator {
export class DirectValueCalculator extends ValueDependentTransactionCalculator {

    private initialPurchasePrice: ValueAmountInput;

    constructor(initialPurchasePrice: ValueAmountInput) {
        super(initialPurchasePrice, undefined, GrowthFrequency.NONE);
    }

    getAmount(inititalValue: ValueInput): ValueAmountInput {
        if (isValueAmountInput(inititalValue)) {
            return inititalValue;
        }
        else if (isValueRateInput(inititalValue)) {
            return {
                type: ValueType.AMOUNT,
                amount: this.initialPurchasePrice.amount * (inititalValue.rate / 100),
            };
        }

    }

    getRate(initialValue: ValueInput): ValueRateInput {
        if (isValueAmountInput(initialValue)) {
            return {
                type: ValueType.RATE,
                rate: (initialValue.amount / this.initialPurchasePrice.amount) * 100,
            };
        }
        else if (isValueRateInput(initialValue)) {
            return initialValue;
        }

    }

}

