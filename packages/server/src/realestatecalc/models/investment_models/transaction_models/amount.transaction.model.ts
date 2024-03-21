import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction } from "./transaction.model";

export class AmountTransaction extends Transaction {
    private amount: number;

    constructor(
        amountValue: ValueAmountInput,
        amountComparedTo: ValueAmountInput,
        growthRate: ValueRateInput = { type: ValueType.RATE, rate: 0 },
        description: string = '') {
        if (amountValue.type !== ValueType.AMOUNT) {
            throw new Error('AmountTransaction requires a ValueAmountInput');
        }
        super(amountComparedTo, growthRate, description);
        this.amount = amountValue.amount;
    }

    getProjectedValue(numberOfYears: number = 0): number {
        return this.amount * (Math.pow((1 + (this.getGrowthRate() / 100)), numberOfYears));
    }

    getRate(): number {
        return (this.amount / this.getAmountComparedTo()) * 100;
    }
}
