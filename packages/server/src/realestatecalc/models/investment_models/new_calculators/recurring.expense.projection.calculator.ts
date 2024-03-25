import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";

// export class RecurringExpensesCalculator extends TransactionCalculator {
export class RecurringExpenseProjectionCalculator extends ValueDependentTransactionCalculator {

    constructor(
        initialRentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
    ) {
        super(initialRentalAmount, rentalGrowthRate);
    }

    getAmount(rateValue: ValueRateInput, numberOfYears: number = 0): ValueAmountInput {
        const futureRentalAmount = this.getFutureDatedAmount(
            this.baseValue.amount,
            this.growthRate.rate,
            numberOfYears
        ).amount;
        return {
            type: ValueType.AMOUNT,
            amount: futureRentalAmount * (rateValue.rate / 100),
        };
    }

    getRate(rateValue: ValueRateInput): ValueRateInput {
        return rateValue;
    }
}
