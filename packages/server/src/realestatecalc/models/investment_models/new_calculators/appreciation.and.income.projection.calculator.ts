import { ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";
import { Injectable } from "@nestjs/common";
import { CalculatorType } from "./transaction.calculator";

// export class IncomeCalculator extends TransactionCalculator {
@Injectable()
export class AppreciationAndIncomeProjectionCalculator extends ValueDependentTransactionCalculator {

    constructor(
        inititalPurchasePrice: ValueAmountInput,
        appreciationGrowthRate: ValueRateInput,
    ) {
        super(inititalPurchasePrice, appreciationGrowthRate);
    }

    getAmount(incomeAmount: ValueInput, incomeGrowthRate: number, numberOfYears: number = 0): ValueAmountInput {
        if (isValueAmountInput(incomeAmount)) {
            return this.getFutureDatedAmount(incomeAmount.amount, incomeGrowthRate, numberOfYears);
        }
        throw new Error('Cannot be rate for AppreciationAndIncomeProjectionCalculator');
    }

    getRate(incomeAmount: ValueInput, incomeGrowthRate: number, numberOfYears: number = 0): ValueRateInput {
        if (isValueAmountInput(incomeAmount)) {
            const appreciationAmount = this.getFutureDatedAmount(this.baseValue.amount, this.growthRate.rate, numberOfYears).amount;
            const futureDatedRentalAmount = this.getFutureDatedAmount(incomeAmount.amount, incomeGrowthRate, numberOfYears).amount;
            return {
                type: ValueType.RATE,
                rate: (futureDatedRentalAmount / appreciationAmount) * 100
            };
        }
        throw new Error('Cannot be rate for AppreciationAndIncomeProjectionCalculator');
    }

    getCalculatorType(): CalculatorType {
        return CalculatorType.APPRECIATION_AND_INCOME_PROJECTIONS;
    }

}