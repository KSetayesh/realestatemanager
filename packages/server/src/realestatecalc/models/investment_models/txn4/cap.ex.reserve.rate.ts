import { ValueRateInput } from "@realestatemanager/shared";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface } from "./calculate.txn.interface";

export class CapExReserveRate implements CalculateTxnInterface<ValueRateInput, RentEstimate> {

    private _baseValue: ValueRateInput;
    // rateOfGrowth implementation omitted for brevity

    constructor(capExReserveRate: ValueRateInput) {
        this._baseValue = capExReserveRate;
    }

    get baseValue(): ValueRateInput {
        return this._baseValue;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears?: number): number {
        return this.getCapExReserveAmount(rentalTxn, numberOfYears);
    }

    getRate(): number {
        return this.getCapExReserveRate();
    }


    private getCapExReserveAmount(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            futureDatedRentalAmount
        );
    }

    private getCapExReserveRate(): number {
        return this.baseValue.rate;
    }

    toDTO() {

    }

}