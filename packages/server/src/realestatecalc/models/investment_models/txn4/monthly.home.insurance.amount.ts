import { ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";

export class MonthlyHomeInsuranceAmount implements Transaction {
    private monthlyHomeInsuranceAmount: ValueInput;
    private expectedGrowthRate: ValueRateInput;

    getMonthlyHomeInsuranceAmount(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper: CalcHelper = new CalcHelper();

        const monthlyHomeInsuranceAmount = calcHelper.getTransactionAmount(
            this.monthlyHomeInsuranceAmount,
            rentalAmount.getInitialRentalAmount()
        );

        return calcHelper.getFutureDatedAmount(monthlyHomeInsuranceAmount, this.expectedGrowthRate.rate, numberOfYears);
    }

    getmonthlyHomeInsurancePercentage(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = rentalAmount.getFutureDatedRentalAmount(numberOfYears);
        const futureDatedMonthlyHomeInsuranceAmount = this.getMonthlyHomeInsuranceAmount(rentalAmount, numberOfYears);
        return new CalcHelper().getTransactionPercent(
            {
                type: ValueType.AMOUNT,
                amount: futureDatedMonthlyHomeInsuranceAmount
            },
            futureDatedRentalAmount
        );
    }

    toDTO() {

    }
}