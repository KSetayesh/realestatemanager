import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { TransactionCalculator } from "./transaction.calculator";

export class IncomeCalculator extends TransactionCalculator {

    // private incomeGrowthRate: ValueRateInput;
    private appreciationGrowthRate: ValueRateInput;
    private inititalPurchasePrice: ValueAmountInput;

    constructor(
        appreciationGrowthRate: ValueRateInput,
        inititalPurchasePrice: ValueAmountInput,
    ) {
        super();
        // this.incomeGrowthRate = incomeGrowthRate;
        this.appreciationGrowthRate = appreciationGrowthRate;
        this.inititalPurchasePrice = inititalPurchasePrice;
    }

    getAmount(incomeAmount: ValueAmountInput, incomeGrowthRate: number, numberOfYears: number = 0): ValueAmountInput {
        return this.getFutureDatedAmount(incomeAmount.amount, incomeGrowthRate, numberOfYears);
    }

    getRate(incomeAmount: ValueAmountInput, incomeGrowthRate: number, numberOfYears: number = 0): ValueRateInput {
        const appreciationAmount = this.getFutureDatedAmount(this.inititalPurchasePrice.amount, this.appreciationGrowthRate.rate, numberOfYears).amount;
        const futureDatedRentalAmount = this.getFutureDatedAmount(incomeAmount.amount, incomeGrowthRate, numberOfYears).amount;
        return {
            type: ValueType.RATE,
            rate: (futureDatedRentalAmount / appreciationAmount) * 100
        };
    }

}