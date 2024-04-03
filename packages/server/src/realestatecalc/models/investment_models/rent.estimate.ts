import { TransactionKey, TransactionType, TxnDTO, Utility, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";

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

    getFutureDatedRentalAmount(monthCounter: number): number {
        return new CalcHelper().getFutureDatedAmount(
            this.getInitialRentalAmount(),
            this.expectedGrowthRate.rate,
            monthCounter
        );
    }

    toDTO(monthCounter: number): TxnDTO {
        return {
            key: TransactionKey.RENTAL_INCOME,
            amount: Utility.round(this.getFutureDatedRentalAmount(monthCounter)),
            percentage: -1, // come back to this
            rateOfGrowth: Utility.round(this.getExpectedGrowthRate()),
            cumulatedAmount: -1, // come back to this
        };
    }
}