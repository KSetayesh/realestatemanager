import { ValueInput } from "@realestatemanager/shared";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface } from "./calculate.txn.interface";

export class InititalRepairCosts implements CalculateTxnInterface<ValueInput, PurchasePrice> {
    private _baseValue: ValueInput;
    // rateOfGrowth implementation omitted for brevity

    constructor(inititalRepairCosts: ValueInput) {
        this._baseValue = inititalRepairCosts;
    }

    get baseValue(): ValueInput {
        return this._baseValue;
    }

    getAmount(purchaseTxn: PurchasePrice): number {
        return this.getInitialRepairCostsAmount(purchaseTxn);
    }

    getRate(purchaseTxn: PurchasePrice): number {
        return this.getInitialRepairCostsPercentage(purchaseTxn);
    }

    private getInitialRepairCostsAmount(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    private getInitialRepairCostsPercentage(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionPercent(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    toDTO() {

    }

}