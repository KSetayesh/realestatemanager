import { ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "../transaction_models/transaction.model";
import { Breakdown } from "./breakdown.model";
import { IncomeCalculator } from "../new_calculators/transaction.calculator";

export class RentalIncomeBreakdown implements Breakdown {

    private rentalIncomeAmount: ValueAmountInput;

    constructor(rentalIncomeAmount: ValueAmountInput) {
        this.rentalIncomeAmount = rentalIncomeAmount;
    }

    calculateRentalIncome(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ): number {
        const incomeCalculator: IncomeCalculator =
            new IncomeCalculator(incomeGrowthRate, appreciationGrowthRate);
        return incomeCalculator.getAmount(this.rentalIncomeAmount, numberOfYears);
    }

    // getTotalAmount(numberOfYears: number = 0): number {
    //     return this.rentalIncomeAmount.getProjectedValue(numberOfYears);
    // }

}