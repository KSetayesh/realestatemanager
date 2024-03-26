import { ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueRateInput } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";
import { Injectable } from "@nestjs/common";

// export class RecurringExpensesCalculator extends TransactionCalculator {
@Injectable()
export class RecurringExpenseProjectionCalculator extends ValueDependentTransactionCalculator {

    constructor(
        initialRentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
    ) {
        super(initialRentalAmount, rentalGrowthRate);
    }

    getAmount(rateValue: ValueInput, numberOfYears: number = 0): ValueAmountInput {
        if (isValueRateInput(rateValue)) {
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
        throw new Error('Cannot be amount for RecurringExpenseProjectionCalculator');
    }

    getRate(rateValue: ValueRateInput): ValueRateInput {
        if (isValueRateInput(rateValue)) {
            return rateValue;
        }
        throw new Error('Cannot be amount for RecurringExpenseProjectionCalculator');
    }
}
