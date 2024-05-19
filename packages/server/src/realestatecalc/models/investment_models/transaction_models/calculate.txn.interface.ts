import { TransactionKey, TransactionType, TxnResponseDTO, ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { RentEstimate } from "./rent.estimate";
import { PurchasePrice } from "./purchase.price";


export interface CalculateTxnInterface<T extends ValueInput, Z extends RentEstimate | PurchasePrice> {
    baseValue: T;
    txnType: TransactionType;
    txnKey: TransactionKey;
    isExpense: boolean;
    rateOfGrowth?: ValueRateInput;
    cumulatedAmount?: number;

    getAmount(rentalTxnOrPurchaseTxn?: Z, monthCounter?: number): number;

    getRate(rentalTxnOrPurchaseTxn?: Z, monthCounter?: number): number;

    toDTO(rentalTxnOrPurchaseTxn?: Z, monthCounter?: number, previousTotalAmount?: number): TxnResponseDTO;

};



