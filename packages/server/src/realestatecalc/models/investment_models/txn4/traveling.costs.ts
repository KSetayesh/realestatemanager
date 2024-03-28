import { Utility, ValueInput } from "@realestatemanager/shared";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class TravelingCosts implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueInput;
    private _txnKey: TransactionKey.TRAVELING_COST;
    private _canBeCumulated: boolean = false;

    constructor(travelingCosts: ValueInput) {
        this._baseValue = travelingCosts;
        this.calcHelper = new CalcHelper();
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
        return this.getTravelingCostsAmount(purchaseTxn);
    }

    getRate(purchaseTxn: PurchasePrice): number {
        return this.getTravelingCostsPercentage(purchaseTxn);
    }

    private getTravelingCostsAmount(purchasePrice: PurchasePrice): number {
        return this.calcHelper.getTransactionAmount(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    private getTravelingCostsPercentage(purchasePrice: PurchasePrice): number {
        return this.calcHelper.getTransactionPercent(
            this.baseValue,
            purchasePrice.getInitialPurchasePrice()
        );
    }

    toDTO(purchaseTxn: PurchasePrice): TxnDTO {
        const txnAmount = this.getAmount(purchaseTxn);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate(purchaseTxn)),
        };
    }
}