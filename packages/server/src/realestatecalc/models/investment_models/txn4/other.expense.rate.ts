import { ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";

export class OtherExpenseRate implements Transaction {
    private otherExpenseRate: ValueRateInput;

    getOtherExpenseAmount(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return new CalcHelper().getTransactionAmount(
            this.otherExpenseRate,
            futureDatedRentalAmount
        );
    }

    getOtherExpenseRate(): number {
        return this.otherExpenseRate.rate;
    }

    toDTO() {

    }
}