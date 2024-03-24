import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { TransactionCalculator } from "./transaction.calculator";

// export class RecurringExpensesCalculator extends TransactionCalculator {
export class RecurringExpenseProjectionCalculator extends TransactionCalculator {

    private rentalGrowthRate: ValueRateInput;
    private initialRentalAmount: ValueAmountInput;

    constructor(
        rentalGrowthRate: ValueRateInput,
        initialRentalAmount: ValueAmountInput,
    ) {
        super();
        this.rentalGrowthRate = rentalGrowthRate;
        this.initialRentalAmount = initialRentalAmount;
    }

    getAmount(rateValue: ValueRateInput, numberOfYears: number = 0): ValueAmountInput {
        const futureRentalAmount = this.getFutureDatedAmount(
            this.initialRentalAmount.amount,
            this.rentalGrowthRate.rate,
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
