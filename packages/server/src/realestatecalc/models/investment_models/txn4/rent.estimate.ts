import { ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";

export class RentEstimate implements Transaction {
    private rentEstimate: ValueAmountInput;
    private expectedGrowthRate: ValueRateInput;

    getInitialRentalAmount(): number {
        return this.rentEstimate.amount;
    }

    getExpectedGrowthRate(): number {
        return this.expectedGrowthRate.rate;
    }

    getFutureDatedRentalAmount(numberOfYears: number = 0): number {
        return new CalcHelper().getFutureDatedAmount(
            this.getInitialRentalAmount(),
            this.expectedGrowthRate.rate,
            numberOfYears
        );
    }

    toDTO() {

    }
}