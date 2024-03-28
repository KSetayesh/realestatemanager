import { Utility, ValueRateInput } from "@realestatemanager/shared";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class PropertyManagementRate implements CalculateTxnInterface<ValueRateInput, RentEstimate> {
    private _baseValue: ValueRateInput;
    private _txnKey: TransactionKey.PROPERTY_MANAGEMENT_EXPENSE;
    private _canBeCumulated: boolean = true;

    constructor(propertyManagementRate: ValueRateInput) {
        this._baseValue = propertyManagementRate;
    }

    get baseValue(): ValueRateInput {
        return this._baseValue;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getPropertyManagementAmount(rentalTxn, numberOfYears);
    }

    getRate(): number {
        return this.getPropertyManagementRate();
    }

    get canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    private getPropertyManagementAmount(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            futureDatedRentalAmount
        );
    }

    private getPropertyManagementRate(): number {
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