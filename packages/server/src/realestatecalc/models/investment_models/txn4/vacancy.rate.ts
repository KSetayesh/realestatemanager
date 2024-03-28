import { Utility, ValueRateInput } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class VacancyRate implements CalculateTxnInterface<ValueRateInput, RentEstimate> {
    private _baseValue: ValueRateInput;
    private _txnKey: TransactionKey.VACANCY_EXPENSE;
    private _canBeCumulated: boolean = true;

    constructor(vacancyRate: ValueRateInput) {
        this._baseValue = vacancyRate;
    }

    get baseValue(): ValueRateInput {
        return this._baseValue;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getVacancyAmount(rentalTxn, numberOfYears);
    }

    getRate(): number {
        return this.getVacancyRate();
    }

    private getVacancyAmount(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            futureDatedRentalAmount
        );
    }

    private getVacancyRate(): number {
        return this.baseValue.rate;
    }

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): any {
        const txnAmount = this.getAmount(rentalTxn, numberOfYears);
        const cumulativeAmount = txnAmount + previousTotalAmount;

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate()),
            ...(this.canBeCumulated && { cumulativeAmount: Utility.round(cumulativeAmount) }),
        };
    }
}