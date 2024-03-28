import { Utility, ValueInput } from "@realestatemanager/shared";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class DownPayment implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private _baseValue: ValueInput;
    private _txnKey: TransactionKey.DOWN_PAYMENT;
    private _canBeCumulated: boolean = false;
    // rateOfGrowth implementation omitted for brevity

    constructor(downPayment: ValueInput) {
        this._baseValue = downPayment;
    }

    get baseValue(): ValueInput {
        return this._baseValue;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    getAmount(purchaseTxn: PurchasePrice): number {
        return this.getDownPaymentAmount(purchaseTxn);
    }

    getRate(purchaseTxn: PurchasePrice): number {
        return this.getDownPaymentPercentage(purchaseTxn);
    }

    private getDownPaymentAmount(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    private getDownPaymentPercentage(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionPercent(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    toDTO(purchaseTxn: PurchasePrice, previousTotalAmount: number = 0): any {
        const txnAmount = this.getAmount(purchaseTxn);
        const cumulativeAmount = txnAmount + previousTotalAmount;

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate(purchaseTxn)),
            ...(this.canBeCumulated && { cumulativeAmount: Utility.round(cumulativeAmount) }),
        };
    }

}