import { Utility, ValueInput } from "@realestatemanager/shared";
import { CalcHelper } from "./calc.helper";
import { PurchasePrice } from "./purchase.price";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class LegalAndProfessionalFee implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private _baseValue: ValueInput;
    private _txnKey: TransactionKey.LEGAL_AND_PROFESSIONAL_FEES;
    private _canBeCumulated: boolean = false;

    constructor(legalAndProfessionalFee: ValueInput) {
        this._baseValue = legalAndProfessionalFee;
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