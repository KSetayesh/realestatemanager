import { ValueRateInput } from "@realestatemanager/shared";
import { AmountAndRate, Transaction } from "./transaction.model";

export class RateTransaction extends Transaction {
    private rate: number;

    constructor(
        rateValue: ValueRateInput,
        growthRate: ValueRateInput,
        amountComparedTo: AmountAndRate,
        description: string = '',
    ) {
        super(growthRate, amountComparedTo, description);
        this.rate = rateValue.rate;
    }

    getProjectedValue(numberOfYears: number = 0): number {
        const amountWithGrowth = this.getProjectedGrowthOfAmountComparedTo(numberOfYears);
        return amountWithGrowth * (this.getRate() / 100);
        // const amountWithGrowth = this.getAmountComparedTo() * (Math.pow((1 + (this.getGrowthRate() / 100)), numberOfYears));
        // return amountWithGrowth * (this.getRate() / 100);
    }

    getRate(): number {
        return this.rate;
    }
}
