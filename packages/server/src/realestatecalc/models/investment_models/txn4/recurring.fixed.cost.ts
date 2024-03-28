import { Utility, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";
import { TransactionKey, TransactionType } from "./calc/calculate";

export class RecurringFixedCost implements CalculateTxnInterface<ValueInput, RentEstimate> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueInput;
    private _rateOfGrowth: ValueRateInput;
    private _txnKey: TransactionKey;
    private _txnType: TransactionType;
    private _cumulatedAmount: number;

    constructor(txnKey: TransactionKey, monthlyHOAFeesAmount: ValueInput, expectedGrowthRate: ValueRateInput) {
        this._txnKey = txnKey;
        this._txnType = TransactionType.FIXED_RECURRING_EXPENSE;
        this._baseValue = monthlyHOAFeesAmount;
        this._rateOfGrowth = expectedGrowthRate;
        this.calcHelper = new CalcHelper();
        this._cumulatedAmount = 0;
    }

    get baseValue(): ValueInput {
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
        const amount = this.calcHelper.getTransactionAmount(
            this.baseValue,
            rentalTxn.getInitialRentalAmount()
        );

        return this.calcHelper.getFutureDatedAmount(amount, this.rateOfGrowth.rate, numberOfYears);

    }

    getRate(rentalTxn: RentEstimate, numberOfYears: number): number {
        const futureDatedRentalAmount = rentalTxn.getFutureDatedRentalAmount(numberOfYears);
        const futureDatedTxnAmount = this.getAmount(rentalTxn, numberOfYears);
        return this.calcHelper.getTransactionPercent(
            {
                type: ValueType.AMOUNT,
                amount: futureDatedTxnAmount
            },
            futureDatedRentalAmount
        );
    }


    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0): TxnDTO {
        const txnAmount = this.getAmount(rentalTxn, numberOfYears);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            rateOfGrowth: Utility.round(this.rateOfGrowth.rate),
            percentage: Utility.round(this.getRate(rentalTxn, numberOfYears)),
            cumulatedAmount: Utility.round(this.cumulatedAmount),
        };
    }
}