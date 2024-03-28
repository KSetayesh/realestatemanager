import { Utility, ValueRateInput } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class OtherExpenseRate implements CalculateTxnInterface<ValueRateInput, RentEstimate> {
    private _baseValue: ValueRateInput;
    private _txnKey: TransactionKey.OTHER_EXPENSES;
    private _canBeCumulated: boolean = true;

    constructor(otherExpenseRate: ValueRateInput) {
        this._baseValue = otherExpenseRate;
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
        return this.getOtherExpenseAmount(rentalTxn, numberOfYears);
    }

    getRate(): number {
        return this.getOtherExpenseRate();
    }

    private getOtherExpenseAmount(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            futureDatedRentalAmount
        );
    }

    private getOtherExpenseRate(): number {
        return this.baseValue.rate;
    }

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): TxnDTO {
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