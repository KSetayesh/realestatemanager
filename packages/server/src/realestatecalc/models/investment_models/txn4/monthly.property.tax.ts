import { Utility, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class MonthlyPropertyTax implements CalculateTxnInterface<ValueInput, RentEstimate> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueInput;
    private _rateOfGrowth: ValueRateInput;
    private _txnKey: TransactionKey.PROPERTY_TAX;
    private _canBeCumulated: boolean = true;

    constructor(monthlyPropertyTax: ValueInput, expectedGrowthRate: ValueRateInput) {
        this._baseValue = monthlyPropertyTax;
        this._rateOfGrowth = expectedGrowthRate;
        this.calcHelper = new CalcHelper();
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
        return this.getMonthlyPropertyTaxAmount(rentalTxn, numberOfYears);
    }

    getRate(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getMonthlyPropertyTaxPercentage(rentalTxn, numberOfYears);
    }

    private getMonthlyPropertyTaxAmount(rentalAmount: RentEstimate, numberOfYears: number = 0): number {

        const monthlyPropertyTaxAmount = this.calcHelper.getTransactionAmount(
            this.baseValue,
            rentalAmount.getInitialRentalAmount()
        );

        return this.calcHelper.getFutureDatedAmount(monthlyPropertyTaxAmount, this.rateOfGrowth.rate, numberOfYears);
    }

    private getMonthlyPropertyTaxPercentage(rentalAmount: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = rentalAmount.getFutureDatedRentalAmount(numberOfYears);
        const futureDatedMonthlyPropertyTaxAmount = this.getMonthlyPropertyTaxAmount(rentalAmount, numberOfYears);
        return this.calcHelper.getTransactionPercent(
            {
                type: ValueType.AMOUNT,
                amount: futureDatedMonthlyPropertyTaxAmount
            },
            futureDatedRentalAmount
        );
    }

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): TxnDTO {
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