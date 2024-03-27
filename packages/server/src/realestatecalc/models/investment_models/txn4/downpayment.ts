import { ValueInput } from "@realestatemanager/shared";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface } from "./calculate.txn.interface";

export class DownPayment implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private _baseValue: ValueInput;
    // rateOfGrowth implementation omitted for brevity

    constructor(downPayment: ValueInput) {
        this._baseValue = downPayment;
    }

    get baseValue(): ValueInput {
        return this._baseValue;
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

    toDTO() {

    }
}