import { ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { RentEstimate } from "./rent.estimate";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface } from "./calculate.txn.interface";

export class MaintenanceRate implements CalculateTxnInterface<ValueRateInput, RentEstimate> {
    private _baseValue: ValueRateInput;

    constructor(maintenanceRate: ValueRateInput) {
        this._baseValue = maintenanceRate;
    }

    get baseValue(): ValueRateInput {
        return this._baseValue;
    }

    getAmount(rentalTxn: RentEstimate, numberOfYears: number = 0): number {
        return this.getMaintenanceExpenses(rentalTxn, numberOfYears);
    }

    getRate(): number {
        return this.getMaintenanceRate();
    }

    private getMaintenanceExpenses(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            futureDatedRentalAmount
        );
    }

    private getMaintenanceRate(): number {
        return this.baseValue.rate;
    }

    toDTO() {

    }
}