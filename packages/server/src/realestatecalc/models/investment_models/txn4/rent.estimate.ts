import { ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { TransactionKey } from "../new_new_new/transaction.detail";
import { TxnDTO } from "./calculate.txn.interface";
import { TransactionType } from "./calc/calculate";

export class RentEstimate {
    private rentEstimate: ValueAmountInput;
    private expectedGrowthRate: ValueRateInput;
    private _txnType: TransactionType;
    private _txnKey: TransactionKey;

    constructor(rentEstimate: ValueAmountInput, expectedGrowthRate: ValueRateInput) {
        this._txnType = TransactionType.INCOME_STREAMS;
        this._txnKey = TransactionKey.RENTAL_INCOME;
        this.rentEstimate = rentEstimate;
        this.expectedGrowthRate = expectedGrowthRate;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get txnType(): TransactionType {
        return this._txnType;
    }

    getInitialRentalAmount(): number {
        return this.rentEstimate.amount;
    }

    getExpectedGrowthRate(): number {
        return this.expectedGrowthRate.rate;
    }

    getFutureDatedRentalAmount(numberOfYears: number = 0): number {
        return new CalcHelper().getFutureDatedAmount(
            this.getInitialRentalAmount(),
            this.expectedGrowthRate.rate,
            numberOfYears
        );
    }

    toDTO(yearCounter: number = 0): TxnDTO {
        return {
            key: TransactionKey.RENTAL_INCOME,
            amount: this.getFutureDatedRentalAmount(yearCounter),
            percentage: -1, // come back to this
            rateOfGrowth: this.getExpectedGrowthRate(),
            cumulatedAmount: -1, // come back to this
        };
    }
}