import {
    TransactionKey,
    TransactionType,
    TxnResponseDTO,
    Utility,
    ValueInput
} from "@realestatemanager/shared";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { PurchasePrice } from "./purchase.price";
import { Transaction } from "./transaction";

export class InitialCost extends Transaction implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private _baseValue: ValueInput;
    private _isExpense: boolean;

    constructor(txnKey: TransactionKey, baseValue: ValueInput) {
        super(txnKey, TransactionType.INITIAL_EXPENSE);
        this._baseValue = baseValue;
        this._isExpense = true;
    }

    get baseValue(): ValueInput {
        return this._baseValue;
    }

    get isExpense(): boolean {
        return this._isExpense;
    }

    getAmount(purchaseTxn: PurchasePrice): number {
        return this.getTransactionAmount(
            this.baseValue,
            purchaseTxn.getInitialPurchasePrice()
        );
    }

    getRate(purchaseTxn: PurchasePrice): number {
        return this.getTransactionPercent(
            this.baseValue,
            purchaseTxn.getInitialPurchasePrice()
        );
    }

    toDTO(purchaseTxn: PurchasePrice): TxnResponseDTO {
        const txnAmount = this.getAmount(purchaseTxn);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate(purchaseTxn)),
        };
    }

}