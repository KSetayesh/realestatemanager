import { TransactionKey, TransactionType, TxnDTO, Utility, ValueInput } from "@realestatemanager/shared";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { PurchasePrice } from "./purchase.price";
import { CalcHelper } from "./calc.helper";

export class InitialCost implements CalculateTxnInterface<ValueInput, PurchasePrice> {

    private calcHelper: CalcHelper;
    private _baseValue: ValueInput;
    private _txnKey: TransactionKey;
    private _txnType: TransactionType;
    private _isExpense: boolean;

    constructor(txnKey: TransactionKey, baseValue: ValueInput) {
        this.calcHelper = new CalcHelper();
        this._txnKey = txnKey;
        this._txnType = TransactionType.INITIAL_EXPENSE;
        this._baseValue = baseValue;
        this._isExpense = true;
    }

    get baseValue(): ValueInput {
        return this._baseValue;
    }

    get txnKey(): TransactionKey {
        return this._txnKey;
    }

    get txnType(): TransactionType {
        return this._txnType;
    }

    get isExpense(): boolean {
        return this._isExpense;
    }

    getAmount(purchaseTxn: PurchasePrice): number {
        return this.calcHelper.getTransactionAmount(
            this.baseValue,
            purchaseTxn.getInitialPurchasePrice()
        );
    }

    getRate(purchaseTxn: PurchasePrice): number {
        return this.calcHelper.getTransactionPercent(
            this.baseValue,
            purchaseTxn.getInitialPurchasePrice()
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