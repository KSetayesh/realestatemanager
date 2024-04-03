import { TransactionKey, TransactionType, TxnDTO, Utility, ValueRateInput } from "@realestatemanager/shared";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";

export class RecurringOperationalCost implements CalculateTxnInterface<ValueRateInput, RentEstimate> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueRateInput;
    private _txnKey: TransactionKey;
    private _txnType: TransactionType;
    private _cumulatedAmount: number;
    private _isExpense: boolean;

    constructor(txnKey: TransactionKey, baseValue: ValueRateInput) {
        this._txnKey = txnKey;
        this._txnType = TransactionType.OPERATIONAL_RECURRING_EXPENSE;
        this._baseValue = baseValue;
        this.calcHelper = new CalcHelper();
        this._isExpense = true;
    }

    get baseValue(): ValueRateInput {
        return this._baseValue;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get txnType(): TransactionType {
        return this._txnType;
    }

    get cumulatedAmount(): number {
        return this._cumulatedAmount;
    }

    get isExpense(): boolean {
        return this._isExpense;
    }

    set cumulatedAmount(amount: number) {
        this._cumulatedAmount = amount;
    }

    getAmount(rentalTxn: RentEstimate, monthCounter: number): number {
        const futureDatedRentalAmount = rentalTxn.getFutureDatedRentalAmount(monthCounter);
        return this.calcHelper.getTransactionAmount(
            this.baseValue,
            futureDatedRentalAmount
        );
    }

    getRate(): number {
        return this.baseValue.rate;
    }


    toDTO(rentalTxn: RentEstimate, monthCounter: number): TxnDTO {
        const txnAmount = this.getAmount(rentalTxn, monthCounter);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate()),
            cumulatedAmount: Utility.round(this.cumulatedAmount),
        };
    }
}