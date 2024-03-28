import { Utility, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class MonthlyHOAFeesAmount implements CalculateTxnInterface<ValueInput, RentEstimate> {

    private _baseValue: ValueInput;
    private _rateOfGrowth: ValueRateInput;
    private _txnKey: TransactionKey.HOA_FEE;
    private _canBeCumulated: boolean = true;

    constructor(monthlyHOAFeesAmount: ValueInput, expectedGrowthRate: ValueRateInput) {
        this._baseValue = monthlyHOAFeesAmount;
        this._rateOfGrowth = expectedGrowthRate;
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

    get canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getMonthlyHOAFeesAmount(rentalTxn, numberOfYears);
    }

    getRate(rentalTxn: RentEstimate, numberOfYears: number): number {
        return this.getMonthlyHOAFeesPercentage(rentalTxn, numberOfYears);
    }

    private getMonthlyHOAFeesAmount(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const calcHelper: CalcHelper = new CalcHelper();

        const monthlyHOAFeesAmount = calcHelper.getTransactionAmount(
            this.baseValue,
            rentalAmount.getInitialRentalAmount()
        );

        return calcHelper.getFutureDatedAmount(monthlyHOAFeesAmount, this.rateOfGrowth.rate, numberOfYears);
    }

    private getMonthlyHOAFeesPercentage(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = rentalAmount.getFutureDatedRentalAmount(numberOfYears);
        const futureDatedMonthlyHOAFeesAmount = this.getMonthlyHOAFeesAmount(rentalAmount, numberOfYears);
        return new CalcHelper().getTransactionPercent(
            {
                type: ValueType.AMOUNT,
                amount: futureDatedMonthlyHOAFeesAmount
            },
            futureDatedRentalAmount
        );
    }

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): any {
        const txnAmount = this.getAmount(rentalTxn, numberOfYears);
        const cumulativeAmount = txnAmount + previousTotalAmount;

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            rateOfGrowth: Utility.round(this.rateOfGrowth.rate),
            percentage: Utility.round(this.getRate(rentalTxn, numberOfYears)),
            ...(this.canBeCumulated && { cumulativeAmount: Utility.round(cumulativeAmount) }),
        };
    }
}