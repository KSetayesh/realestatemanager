import { ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { AmountAndRate, Transaction } from "./transaction.model";

export class AmountTransaction extends Transaction {
    private amount: number;

    constructor(
        amountValue: ValueAmountInput,
        growthRate: ValueRateInput,
        amountComparedTo: AmountAndRate,
        description: string = ''
    ) {
        super(growthRate, amountComparedTo, description);
        this.amount = amountValue.amount;
    }

    getProjectedValue(numberOfYears: number = 0): number {
        return this.amount * (Math.pow((1 + (this.getGrowthRate() / 100)), numberOfYears));
    }

    getRate(numberOfYears: number = 0): number {
        return (this.amount / this.getProjectedGrowthOfAmountComparedTo(numberOfYears)) * 100;
    }
}
