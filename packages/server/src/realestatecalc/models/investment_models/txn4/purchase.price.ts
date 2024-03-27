import { ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";

export class PurchasePrice implements Transaction {
    private initialPurchasePrice: ValueAmountInput;
    private expectedAppreciationRate: ValueRateInput;

    getInitialPurchasePrice(): number {
        return this.initialPurchasePrice.amount;
    }

    getExpectedAppreciationRate(): number {
        return this.expectedAppreciationRate.rate;
    }

    getFutureDatedHomeValue(numberOfYears: number = 0): number {
        const getMonthlyAppreciationRate = (growthRate: number): number => {
            // Calculate the equivalent monthly appreciation rate for a 4% annual rate
            const annualAppreciationRate = growthRate / 100;
            return Math.pow(1 + annualAppreciationRate, 1 / 12) - 1;
        };

        return new CalcHelper().getFutureDatedAmount(
            this.getInitialPurchasePrice(),
            getMonthlyAppreciationRate(this.getExpectedAppreciationRate()),
            numberOfYears
        );

    }

    toDTO() {

    }
}