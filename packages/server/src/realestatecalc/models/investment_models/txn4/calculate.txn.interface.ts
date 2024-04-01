import { ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { RentEstimate } from "./rent.estimate";
import { PurchasePrice } from "./purchase.price";
import { TransactionKey, TransactionType } from "./calc/investment.calculator";

export type TxnDTO = {
    key: TransactionKey,
    amount: number,
    percentage: number,
    rateOfGrowth?: number,
    cumulatedAmount?: number,
};

export interface CalculateTxnInterface<T extends ValueInput, Z extends RentEstimate | PurchasePrice> {
    baseValue: T;
    txnType: TransactionType;
    txnKey: TransactionKey;
    isExpense: boolean;
    rateOfGrowth?: ValueRateInput;
    cumulatedAmount?: number;

    getAmount(rentalTxnOrPurchaseTxn?: Z, monthCounter?: number): number;

    getRate(rentalTxnOrPurchaseTxn?: Z, monthCounter?: number): number;

    // Update return value from any to something else
    toDTO(rentalTxnOrPurchaseTxn?: Z, monthCounter?: number, previousTotalAmount?: number): TxnDTO;

}

export interface MortgageCalculateTxnInterface extends CalculateTxnInterface<ValueRateInput, PurchasePrice> {
    getMortgageAmount(): number;

    getLoanAmount(): number;

    calculateBalanceAfterPayment(paymentNumber: number): number;

    getPrincipalAmountForPayment(paymentNumber: number): number;

    getInterestAmountForPayment(paymentNumber: number): number;

    getPercentageOfInterest(paymentNumber: number): number;

    getPercentageOfPrincipal(paymentNumber: number): number;

    hasPMI(): boolean;

    getPMIAmount(paymentNumber: number): number;

    getPMIRate(): number;
}

