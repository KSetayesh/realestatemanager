import { Utility, ValueRateInput } from "@realestatemanager/shared";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class CapExReserveRate implements CalculateTxnInterface<ValueRateInput, RentEstimate> {

    private _baseValue: ValueRateInput;
    private _txnKey: TransactionKey.CAP_EX_RESERVE_EXPENSE;
    private _canBeCumulated: boolean = true;
    // rateOfGrowth implementation omitted for brevity

    constructor(capExReserveRate: ValueRateInput) {
        this._baseValue = capExReserveRate;
    }

    get baseValue(): ValueRateInput {
        return this._baseValue;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
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

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): any {
        const txnAmount = this.getAmount(rentalTxn, numberOfYears);
        const cumulativeAmount = txnAmount + previousTotalAmount;

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate()),
            ...(this.canBeCumulated && { cumulativeAmount: Utility.round(cumulativeAmount) }),
        };
    }

}