import { TransactionKey, TransactionType, ValueInput, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { getYear } from "src/shared/Constants";

export abstract class Transaction {

    private _txnKey: TransactionKey;
    private _txnType: TransactionType;

    constructor(
        txnKey: TransactionKey,
        txnType: TransactionType
    ) {
        this._txnKey = txnKey;
        this._txnType = txnType;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get txnType(): TransactionType {
        return this._txnType;
    }

    protected getFutureDatedAmount(
        principal: number,
        growthRate: number,
        monthCounter: number,
    ): number {
        const rateOfGrowth = 1 + (growthRate / 100);
        return principal * (Math.pow(rateOfGrowth, getYear(monthCounter)));
    }

    protected getTransactionAmount(valueInput: ValueInput, principalAmount: number): number {
        if (isValueAmountInput(valueInput)) {
            return valueInput.amount;
        }
        else if (isValueRateInput(valueInput)) {
            return principalAmount * (valueInput.rate / 100);
        }
    }

    protected getTransactionPercent(valueInput: ValueInput, principalAmount: number): number {
        if (isValueAmountInput(valueInput)) {
            return (valueInput.amount / principalAmount) * 100;
        }
        else if (isValueRateInput(valueInput)) {
            return valueInput.rate;
        }
    }
}