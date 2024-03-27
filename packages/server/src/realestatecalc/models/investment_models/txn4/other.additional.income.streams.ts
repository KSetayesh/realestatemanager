import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";

export class OtherAdditionalIncomeStreams implements Transaction {
    private additionalIncomeStreams: ValueAmountInput;
    private expectedGrowthRate: ValueRateInput;

    getOtherAdditionalIncomeStreamsAmount(numberOfYears: number = 0): number {
        return new CalcHelper().getFutureDatedAmount(
            this.additionalIncomeStreams.amount,
            this.expectedGrowthRate.rate,
            numberOfYears
        );
    }

    getOtherAdditionalIncomeStreamsPercentage(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper = new CalcHelper();
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);

        const otherAdditionalIncomeStreamsAmount: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getOtherAdditionalIncomeStreamsAmount(numberOfYears),
        };

        return calcHelper.getTransactionPercent(otherAdditionalIncomeStreamsAmount, futureDatedRentalAmount);

    }

    toDTO() {

    }
}