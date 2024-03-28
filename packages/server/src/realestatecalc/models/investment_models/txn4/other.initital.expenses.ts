import { Utility, ValueInput } from "@realestatemanager/shared";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class OtherInitialExpenses implements CalculateTxnInterface<ValueInput, PurchasePrice> {
    private _baseValue: ValueInput;
    private _txnKey: TransactionKey.OTHER_INITIAL_EXPENSES;
    private _canBeCumulated: boolean = false;

    constructor(otherInitialExpenses: ValueInput) {
        this._baseValue = otherInitialExpenses;
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
        return this.getOtherInititalExpensesAmount(purchaseTxn);
    }

    getRate(purchaseTxn: PurchasePrice): number {
        return this.getOtherInititalExpensesPercentage(purchaseTxn);
    }

    private getOtherInititalExpensesAmount(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    private getOtherInititalExpensesPercentage(purchasePrice: PurchasePrice): number {
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