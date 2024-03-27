import { ValueInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { PurchasePrice } from "./purchase.price";
import { CalculateTxnInterface } from "./calculate.txn.interface";

export class ClosingCosts implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private _baseValue: ValueInput;
    // rateOfGrowth implementation omitted for brevity

    constructor(closingCosts: ValueInput) {
        this._baseValue = closingCosts;
    }

    get baseValue(): ValueInput {
        return this._baseValue;
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

    toDTO() {

    }
}