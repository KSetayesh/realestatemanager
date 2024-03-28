import { Utility, ValueRateInput } from "@realestatemanager/shared";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class MaintenanceRate implements CalculateTxnInterface<ValueRateInput, RentEstimate> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueRateInput;
    private _txnKey: TransactionKey.MAINTENANCE_EXPENSE;
    private _canBeCumulated: boolean = true;

    constructor(maintenanceRate: ValueRateInput) {
        this._baseValue = maintenanceRate;
        this.calcHelper = new CalcHelper();
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
        return this.getMaintenanceExpenses(rentalTxn, numberOfYears);
    }

    getRate(): number {
        return this.getMaintenanceRate();
    }

    private getMaintenanceExpenses(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return this.calcHelper.getTransactionAmount(
            this.baseValue,
            futureDatedRentalAmount
        );
    }

    private getMaintenanceRate(): number {
        return this.baseValue.rate;
    }

    toDTO(rentalTxn: RentEstimate, numberOfYears: number = 0, previousTotalAmount: number = 0): TxnDTO {
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