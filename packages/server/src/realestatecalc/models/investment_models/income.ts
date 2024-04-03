import { TransactionKey, TransactionType, TxnDTO, Utility, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";

export class Income implements CalculateTxnInterface<ValueAmountInput, RentEstimate> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueAmountInput;
    private _rateOfGrowth: ValueRateInput;
    private _txnType: TransactionType;
    private _txnKey: TransactionKey;
    private _cumulatedAmount: number;
    private _isExpense: boolean

    constructor(txnKey: TransactionKey, baseValue: ValueAmountInput, expectedGrowthRate: ValueRateInput) {
        this._txnKey = txnKey;
        this._txnType = TransactionType.INCOME_STREAMS;
        this._baseValue = baseValue;
        this._rateOfGrowth = expectedGrowthRate;
        this.calcHelper = new CalcHelper();
        this._cumulatedAmount = 0;
        this._isExpense = false;
    }

    get baseValue(): ValueAmountInput {
        return this._baseValue;
    }

    get rateOfGrowth(): ValueRateInput {
        return this._rateOfGrowth;
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
        return this.calcHelper.getFutureDatedAmount(
            this.baseValue.amount,
            this.rateOfGrowth.rate,
            monthCounter
        );
    }

    getRate(rentalTxn: RentEstimate, monthCounter: number): number {
        const futureDatedRentalAmount = rentalTxn.getFutureDatedRentalAmount(monthCounter);

        const income: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getAmount(rentalTxn, monthCounter),
        };

        return this.calcHelper.getTransactionPercent(income, futureDatedRentalAmount);

    }

    toDTO(rentalTxn: RentEstimate, monthCounter: number): TxnDTO {
        const txnAmount = this.getAmount(rentalTxn, monthCounter);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate(rentalTxn, monthCounter)),
            rateOfGrowth: Utility.round(this.rateOfGrowth.rate),
            cumulatedAmount: Utility.round(this.cumulatedAmount),
        };
    }
}