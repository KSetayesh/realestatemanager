import { ValueInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { PurchasePrice } from "./purchase.price";
import { CalculateTxnInterface } from "./calculate.txn.interface";

export class LegalAndProfessionalFee implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private _baseValue: ValueInput;

    constructor(legalAndProfessionalFee: ValueInput) {
        this._baseValue = legalAndProfessionalFee;
    }

    get baseValue(): ValueInput {
        return this._baseValue;
    }

    getAmount(purchaseTxn: PurchasePrice): number {
        return this.getLegalAndProfessionalFeeAmount(purchaseTxn);
    }

    getRate(purchaseTxn: PurchasePrice): number {
        return this.getLegalAndProfessionalFeePercentage(purchaseTxn);
    }

    private getLegalAndProfessionalFeeAmount(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionAmount(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    private getLegalAndProfessionalFeePercentage(purchasePrice: PurchasePrice): number {
        return new CalcHelper().getTransactionPercent(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    toDTO() {

    }
}