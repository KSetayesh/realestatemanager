import {
    TransactionKey,
    TransactionType,
    TxnResponseDTO,
    ValueAmountInput,
    ValueRateInput,
    ValueType
} from "@realestatemanager/types";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { RentEstimate } from "./rent.estimate";
import { Transaction } from "./transaction";
import { CalcUtility } from "src/utility/calc.utility";
import { Utility } from "@realestatemanager/utilities";

export class Income extends Transaction implements CalculateTxnInterface<ValueAmountInput, RentEstimate> {

    private _baseValue: ValueAmountInput;
    private _rateOfGrowth: ValueRateInput;
    private _cumulatedAmount: number;
    private _isExpense: boolean

    constructor(
        txnKey: TransactionKey,
        baseValue: ValueAmountInput,
        expectedGrowthRate: ValueRateInput
    ) {
        super(txnKey, TransactionType.INCOME_STREAMS);
        this._baseValue = baseValue;
        this._rateOfGrowth = expectedGrowthRate;
        this._cumulatedAmount = 0;
        this._isExpense = false;
    }

    get baseValue(): ValueAmountInput {
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
        return this.getFutureDatedAmount(
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

        return this.getTransactionPercent(income, futureDatedRentalAmount);

    }

    getCumulatedAmount(rentalTxn: RentEstimate, monthCounter: number): number {
        return CalcUtility.accumulateAndSum(month => this.getAmount(rentalTxn, month), monthCounter);
    }

    toDTO(rentalTxn: RentEstimate, monthCounter: number): TxnResponseDTO {
        const txnAmount = this.getAmount(rentalTxn, monthCounter);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate(rentalTxn, monthCounter)),
            rateOfGrowth: Utility.round(this.rateOfGrowth.rate),
            cumulatedAmount: Utility.round(this.getCumulatedAmount(rentalTxn, monthCounter)),
        };
    }
}