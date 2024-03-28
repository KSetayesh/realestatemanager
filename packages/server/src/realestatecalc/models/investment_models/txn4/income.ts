import { Utility, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";
import { TransactionKey } from "../new_new_new/transaction.detail";
import { TransactionType } from "./calc/calculate";

export class Income implements CalculateTxnInterface<ValueAmountInput, RentEstimate> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueAmountInput;
    private _rateOfGrowth: ValueRateInput;
    private _txnType: TransactionType;
    private _txnKey: TransactionKey;
    private _cumulatedAmount: number;

    constructor(txnKey: TransactionKey, storageUnitFees: ValueAmountInput, expectedGrowthRate: ValueRateInput) {
        this._txnKey = txnKey;
        this._txnType = TransactionType.INCOME_STREAMS;
        this._baseValue = storageUnitFees;
        this._rateOfGrowth = expectedGrowthRate;
        this.calcHelper = new CalcHelper();
        this._cumulatedAmount = 0;
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

    set cumulatedAmount(amount: number) {
        this._cumulatedAmount = amount;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.calcHelper.getFutureDatedAmount(
            this.baseValue.amount,
            this.rateOfGrowth.rate,
            numberOfYears
        );
    }

    getRate(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = rentalTxn.getFutureDatedRentalAmount(numberOfYears);

        const income: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getAmount(rentalTxn, numberOfYears),
        };

        return this.calcHelper.getTransactionPercent(income, futureDatedRentalAmount);

    }


    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0): TxnDTO {
        const txnAmount = this.getAmount(rentalTxn, numberOfYears);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate(rentalTxn, numberOfYears)),
            rateOfGrowth: Utility.round(this.rateOfGrowth.rate),
            cumulatedAmount: Utility.round(this.cumulatedAmount),
        };
    }
}