import { ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";
import { CalculateTxnInterface } from "./calculate.txn.interface";

export class LaundryService implements CalculateTxnInterface<ValueAmountInput, RentEstimate> {

    private _baseValue: ValueAmountInput;
    private _rateOfGrowth: ValueRateInput;

    constructor(laundryServiceFee: ValueAmountInput, expectedGrowthRate: ValueRateInput) {
        this._baseValue = laundryServiceFee;
        this._rateOfGrowth = expectedGrowthRate;
    }

    get baseValue(): ValueAmountInput {
        return this._baseValue;
    }

    get rateOfGrowth(): ValueRateInput {
        return this._rateOfGrowth;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getLaundryServiceIncome(numberOfYears);
    }

    getRate(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getLaundryServicePercentage(rentalTxn, numberOfYears);
    }

    private getLaundryServiceIncome(numberOfYears: number = 0): number {
        return new CalcHelper().getFutureDatedAmount(
            this.baseValue.amount,
            this.rateOfGrowth.rate,
            numberOfYears
        );
    }

    private getLaundryServicePercentage(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper = new CalcHelper();
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);

        const laundryServiceAmount: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getLaundryServiceIncome(numberOfYears),
        };

        return calcHelper.getTransactionPercent(laundryServiceAmount, futureDatedRentalAmount);

    }

    toDTO() {

    }
}