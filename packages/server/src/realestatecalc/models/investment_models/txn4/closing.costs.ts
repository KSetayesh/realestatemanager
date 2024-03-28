import { Utility, ValueInput } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { PurchasePrice } from "./purchase.price";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class ClosingCosts implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private _baseValue: ValueInput;
    private _txnKey: TransactionKey.CLOSING_COST;
    private _canBeCumulated: boolean = false;
    // rateOfGrowth implementation omitted for brevity

    constructor(closingCosts: ValueInput) {
        this._baseValue = closingCosts;
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
        return this.getClosingCostsAmount(purchaseTxn);
    }

    getRate(purchaseTxn: PurchasePrice): number {
        return this.getClosingCostsPercentage(purchaseTxn);
    }

    private getClosingCostsAmount(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    private getClosingCostsPercentage(purchasePrice: PurchasePrice): number {
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