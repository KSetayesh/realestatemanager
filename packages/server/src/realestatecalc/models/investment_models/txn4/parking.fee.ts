import { ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";

export class ParkingFee implements Transaction {
    private parkingFee: ValueAmountInput;
    private expectedGrowthRate: ValueRateInput;

    getParkingFeeIncome(numberOfYears: number = 0): number {
        return new CalcHelper().getFutureDatedAmount(
            this.parkingFee.amount,
            this.expectedGrowthRate.rate,
            numberOfYears
        );
    }

    getParkingFeePercentage(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper = new CalcHelper();
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);

        const laundryServiceAmount: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getParkingFeeIncome(numberOfYears),
        };

        return calcHelper.getTransactionPercent(laundryServiceAmount, futureDatedRentalAmount);

    }

    toDTO() {

    }
}