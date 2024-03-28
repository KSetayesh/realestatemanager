import { ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { RentEstimate } from "./rent.estimate";
import { PurchasePrice } from "./purchase.price";
import { TransactionKey } from "./calc/calculate";

export type TxnDTO = {
    key: TransactionKey,
    amount: number,
    percentage: number,
    rateOfGrowth?: number,
    canBeCumulated?: number,
};

export interface CalculateTxnInterface<T extends ValueInput, Z extends RentEstimate | PurchasePrice> {
    baseValue: T;
    txnKey: TransactionKey;
    canBeCumulated: boolean;
    rateOfGrowth?: ValueRateInput;

    getAmount(rentalTxnOrPurchaseTxn?: Z, numberOfYears?: number): number;

    getRate(rentalTxnOrPurchaseTxn?: Z, numberOfYears?: number): number;

    // Update return value from any to something else
    toDTO(rentalTxnOrPurchaseTxn?: Z, numberOfYears?: number, previousTotalAmount?: number): TxnDTO;

}

