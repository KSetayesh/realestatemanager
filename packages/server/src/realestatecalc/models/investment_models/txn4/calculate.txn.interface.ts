import { ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { RentEstimate } from "./rent.estimate";
import { PurchasePrice } from "./purchase.price";

export interface CalculateTxnInterface<T extends ValueInput, Z extends RentEstimate | PurchasePrice> {
    baseValue: T;
    rateOfGrowth?: ValueRateInput;

    getAmount(rentalTxnOrPurchaseTxn?: Z, numberOfYears?: number): number;

    getRate(rentalTxnOrPurchaseTxn?: Z, numberOfYears?: number): number;

}

