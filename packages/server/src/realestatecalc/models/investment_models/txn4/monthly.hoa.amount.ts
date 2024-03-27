import { ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";

export class MonthlyHOAFeesAmount implements Transaction {
    private monthlyHOAFeesAmount: ValueInput;
    private expectedGrowthRate: ValueRateInput;

    getMonthlyHOAFeesAmount(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper: CalcHelper = new CalcHelper();

        const monthlyHOAFeesAmount = calcHelper.getTransactionAmount(
            this.monthlyHOAFeesAmount,
            rentalAmount.getInitialRentalAmount()
        );

        return calcHelper.getFutureDatedAmount(monthlyHOAFeesAmount, this.expectedGrowthRate.rate, numberOfYears);
    }

    getMonthlyHOAFeesPercentage(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = rentalAmount.getFutureDatedRentalAmount(numberOfYears);
        const futureDatedMonthlyHOAFeesAmount = this.getMonthlyHOAFeesAmount(rentalAmount, numberOfYears);
        return new CalcHelper().getTransactionPercent(
            {
                type: ValueType.AMOUNT,
                amount: futureDatedMonthlyHOAFeesAmount
            },
            futureDatedRentalAmount
        );
    }

    toDTO() {

    }
}