import { Utility, ValueInput } from "@realestatemanager/shared";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";
import { CalculateTxnInterface, TxnDTO } from "./calculate.txn.interface";
import { TransactionKey } from "./calc/calculate";

export class InititalRepairCosts implements CalculateTxnInterface<ValueInput, PurchasePrice> {
    private _baseValue: ValueInput;
    private _txnKey: TransactionKey.INITIAL_REPAIR_COST;
    private _canBeCumulated: boolean = false;
    // rateOfGrowth implementation omitted for brevity

    constructor(inititalRepairCosts: ValueInput) {
        this._baseValue = inititalRepairCosts;
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

    toDTO(purchaseTxn: PurchasePrice, previousTotalAmount: number = 0): TxnDTO {
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