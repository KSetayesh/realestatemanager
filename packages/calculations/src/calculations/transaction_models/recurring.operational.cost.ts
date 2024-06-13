import { 
    TransactionKey, 
    TransactionType, 
    TxnResponseDTO, 
    Utility, 
    ValueRateInput 
} from "@realestatemanager/types";
import { CalculateTxnInterface } from "./calculate.txn.interface";
import { RentEstimate } from "./rent.estimate";
import { Transaction } from "./transaction";

export class RecurringOperationalCost extends Transaction implements CalculateTxnInterface<ValueRateInput, RentEstimate> {

    private _baseValue: ValueRateInput;
    private _cumulatedAmount: number;
    private _isExpense: boolean;

    constructor(txnKey: TransactionKey, baseValue: ValueRateInput) {
        super(txnKey, TransactionType.OPERATIONAL_RECURRING_EXPENSE);
        this._baseValue = baseValue;
        this._isExpense = true;
    }

    get baseValue(): ValueRateInput {
        return this._baseValue;
    }

    get cumulatedAmount(): number {
        return this._cumulatedAmount;
    }

    get isExpense(): boolean {
        return this._isExpense;
    }

    set cumulatedAmount(amount: number) {
        this._cumulatedAmount = amount;
    }

    getAmount(rentalTxn: RentEstimate, monthCounter: number): number {
        const futureDatedRentalAmount = rentalTxn.getFutureDatedRentalAmount(monthCounter);
        return this.getTransactionAmount(
            this.baseValue,
            futureDatedRentalAmount
        );
    }

    getRate(): number {
        return this.baseValue.rate;
    }


    toDTO(rentalTxn: RentEstimate, monthCounter: number): TxnResponseDTO {
        const txnAmount = this.getAmount(rentalTxn, monthCounter);

        return {
            key: this.txnKey,
            amount: Utility.round(txnAmount),
            percentage: Utility.round(this.getRate()),
            cumulatedAmount: Utility.round(this.cumulatedAmount),
        };
    }
}