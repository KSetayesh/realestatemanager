import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction } from "./transaction.model";

export class RateTransaction extends Transaction {
    private rate: number;

    constructor(
        rateValue: ValueRateInput,
        amountComparedTo: ValueAmountInput,
        growthRate: ValueRateInput = { type: ValueType.RATE, rate: 0 },
        description: string = ''
    ) {
        // Validate that the input is indeed of ValueType.RATE
        if (rateValue.type !== ValueType.RATE) {
            throw new Error('RateTransaction requires a ValueRateInput');
        }
        if (amountComparedTo.type !== ValueType.AMOUNT) {
            throw new Error('RateTransaction requires a ValueAmountInput');
        }
        super(amountComparedTo, growthRate, description);
        this.rate = rateValue.rate;
        // this.amount = amountComparedTo.amount;
    }

    getProjectedValue(numberOfYears: number = 0): number {
        const amountWithGrowth = this.getAmountComparedTo() * (Math.pow((1 + (this.getGrowthRate() / 100)), numberOfYears));
        return amountWithGrowth * (this.getRate() / 100);
    }

    getRate(): number {
        return this.rate;
    }
}
