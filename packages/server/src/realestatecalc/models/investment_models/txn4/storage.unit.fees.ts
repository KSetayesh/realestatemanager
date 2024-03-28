import { Utility, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class StorageUnitFees implements CalculateTxnInterface<ValueAmountInput, RentEstimate> {
    private _baseValue: ValueAmountInput;
    private _rateOfGrowth: ValueRateInput;
    private _txnKey: TransactionKey.STORAGE_UNIT_FEES;
    private _canBeCumulated: boolean = true;

    constructor(storageUnitFees: ValueAmountInput, expectedGrowthRate: ValueRateInput) {
        this._baseValue = storageUnitFees;
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
        return this.getStorageUnitFeesAmount(numberOfYears);
    }

    getRate(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getStorageUnitFeesPercentage(rentalTxn, numberOfYears);
    }

    private getStorageUnitFeesAmount(numberOfYears: number = 0): number {
        return new CalcHelper().getFutureDatedAmount(
            this.baseValue.amount,
            this.rateOfGrowth.rate,
            numberOfYears
        );
    }

    private getStorageUnitFeesPercentage(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper = new CalcHelper();
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);

        const storageUnitFees: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: this.getStorageUnitFeesAmount(numberOfYears),
        };

        return calcHelper.getTransactionPercent(storageUnitFees, futureDatedRentalAmount);

    }

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): TxnDTO {
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