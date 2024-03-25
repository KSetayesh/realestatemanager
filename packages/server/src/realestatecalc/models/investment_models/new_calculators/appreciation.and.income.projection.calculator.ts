import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";

// export class IncomeCalculator extends TransactionCalculator {
export class AppreciationAndIncomeProjectionCalculator extends ValueDependentTransactionCalculator {

    constructor(
        inititalPurchasePrice: ValueAmountInput,
        appreciationGrowthRate: ValueRateInput,
    ) {
        super(inititalPurchasePrice, appreciationGrowthRate);
    }

    getAmount(incomeAmount: ValueAmountInput, incomeGrowthRate: number, numberOfYears: number = 0): ValueAmountInput {
        return this.getFutureDatedAmount(incomeAmount.amount, incomeGrowthRate, numberOfYears);
    }

    getRate(incomeAmount: ValueAmountInput, incomeGrowthRate: number, numberOfYears: number = 0): ValueRateInput {
        const appreciationAmount = this.getFutureDatedAmount(this.baseValue.amount, this.growthRate.rate, numberOfYears).amount;
        const futureDatedRentalAmount = this.getFutureDatedAmount(incomeAmount.amount, incomeGrowthRate, numberOfYears).amount;
        return {
            type: ValueType.RATE,
            rate: (futureDatedRentalAmount / appreciationAmount) * 100
        };
    }

}