import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";

export class StorageUnitFees implements Transaction {
    private storageUnitFees: ValueAmountInput;
    private expectedGrowthRate: ValueRateInput;

    getStorageUnitFeesAmount(numberOfYears: number = 0): number {
        return new CalcHelper().getFutureDatedAmount(
            this.storageUnitFees.amount,
            this.expectedGrowthRate.rate,
            numberOfYears
        );
    }

    getStorageUnitFeesPercentage(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper = new CalcHelper();
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);

        const storageUnitFees: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getStorageUnitFeesAmount(numberOfYears),
        };

        return calcHelper.getTransactionPercent(storageUnitFees, futureDatedRentalAmount);

    }

    toDTO() {

    }
}