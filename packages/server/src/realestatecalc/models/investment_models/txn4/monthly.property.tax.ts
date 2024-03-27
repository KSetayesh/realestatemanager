import { ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";

export class MonthlyPropertyTax implements Transaction {
    private monthlyPropertyTax: ValueInput;
    private expectedGrowthRate: ValueRateInput;

    getMonthlyPropertyTaxAmount(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper: CalcHelper = new CalcHelper();

        const monthlyPropertyTaxAmount = calcHelper.getTransactionAmount(
            this.monthlyPropertyTax,
            rentalAmount.getInitialRentalAmount()
        );

        return calcHelper.getFutureDatedAmount(monthlyPropertyTaxAmount, this.expectedGrowthRate.rate, numberOfYears);
    }

    getMonthlyPropertyTaxPercentage(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = rentalAmount.getFutureDatedRentalAmount(numberOfYears);
        const futureDatedMonthlyPropertyTaxAmount = this.getMonthlyPropertyTaxAmount(rentalAmount, numberOfYears);
        return new CalcHelper().getTransactionPercent(
            {
                type: ValueType.AMOUNT,
                amount: futureDatedMonthlyPropertyTaxAmount
            },
            futureDatedRentalAmount
        );
    }

    toDTO() {

    }

}