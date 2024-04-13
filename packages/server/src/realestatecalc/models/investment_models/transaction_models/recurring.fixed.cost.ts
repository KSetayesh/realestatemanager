import { TransactionKey, TransactionType, TxnDTO, Utility, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { RentEstimate } from "./rent.estimate";
import { Transaction } from "./transaction";

export class RecurringFixedCost extends Transaction implements CalculateTxnInterface<ValueInput, RentEstimate> {

    private _baseValue: ValueInput;
    private _rateOfGrowth: ValueRateInput;
    private _cumulatedAmount: number;
    private _isExpense: boolean;

    constructor(txnKey: TransactionKey, baseValue: ValueInput, expectedGrowthRate: ValueRateInput) {
        super(txnKey, TransactionType.FIXED_RECURRING_EXPENSE);
        this._baseValue = baseValue;
        this._rateOfGrowth = expectedGrowthRate;
        this._cumulatedAmount = 0;
        this._isExpense = true;
    }

    get baseValue(): ValueInput {
        return this._baseValue;
    }

    get rateOfGrowth(): ValueRateInput {
        return this._rateOfGrowth;
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
        const amount = this.getTransactionAmount(
            this.baseValue,
            rentalTxn.getInitialRentalAmount()
        );

        return this.getFutureDatedAmount(amount, this.rateOfGrowth.rate, monthCounter);

    }

    getRate(rentalTxn: RentEstimate, monthCounter: number): number {
        const futureDatedRentalAmount = rentalTxn.getFutureDatedRentalAmount(monthCounter);
        const futureDatedTxnAmount = this.getAmount(rentalTxn, monthCounter);
        return this.getTransactionPercent(
            {
                type: ValueType.AMOUNT,
                amount: futureDatedTxnAmount
            },
            futureDatedRentalAmount
        );
    }


    toDTO(rentalTxn: RentEstimate, monthCounter: number): TxnDTO {
        const txnAmount = this.getAmount(rentalTxn, monthCounter);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            rateOfGrowth: Utility.round(this.rateOfGrowth.rate),
            percentage: Utility.round(this.getRate(rentalTxn, monthCounter)),
            cumulatedAmount: Utility.round(this.cumulatedAmount),
        };
    }
}