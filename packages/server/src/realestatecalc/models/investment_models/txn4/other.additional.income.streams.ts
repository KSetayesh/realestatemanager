import { Utility, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class OtherAdditionalIncomeStreams implements CalculateTxnInterface<ValueAmountInput, RentEstimate> {
    private _baseValue: ValueAmountInput;
    private _rateOfGrowth: ValueRateInput;
    private _txnKey: TransactionKey.OTHER_ADDITIONAL_INCOME_STREAMS;
    private _canBeCumulated: boolean = true;

    constructor(additionalIncomeStreams: ValueAmountInput, expectedGrowthRate: ValueRateInput) {
        this._baseValue = additionalIncomeStreams;
        this._rateOfGrowth = expectedGrowthRate;
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

    get canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getOtherAdditionalIncomeStreamsAmount(numberOfYears);
    }

    getRate(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getOtherAdditionalIncomeStreamsPercentage(rentalTxn, numberOfYears);
    }

    private getOtherAdditionalIncomeStreamsAmount(numberOfYears: number = 0): number {
        return new CalcHelper().getFutureDatedAmount(
            this.baseValue.amount,
            this.rateOfGrowth.rate,
            numberOfYears
        );
    }

    private getOtherAdditionalIncomeStreamsPercentage(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper = new CalcHelper();
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);

        const otherAdditionalIncomeStreamsAmount: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getOtherAdditionalIncomeStreamsAmount(numberOfYears),
        };

        return calcHelper.getTransactionPercent(otherAdditionalIncomeStreamsAmount, futureDatedRentalAmount);

    }

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): any {
        const txnAmount = this.getAmount(rentalTxn, numberOfYears);
        const cumulativeAmount = txnAmount + previousTotalAmount;

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate(rentalTxn, numberOfYears)),
            rateOfGrowth: Utility.round(this.rateOfGrowth.rate),
            ...(this.canBeCumulated && { cumulativeAmount: Utility.round(cumulativeAmount) }),
        };
    }
}