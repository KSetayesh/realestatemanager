import { ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";

export class PropertyManagementRate implements Transaction {
    private propertyManagementRate: ValueRateInput;

    getPropertyManagementAmount(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return new CalcHelper().getTransactionAmount(
            this.propertyManagementRate,
            futureDatedRentalAmount
        );
    }

    getPropertyManagementRate(): number {
        return this.propertyManagementRate.rate;
    }

    toDTO() {

    }
}