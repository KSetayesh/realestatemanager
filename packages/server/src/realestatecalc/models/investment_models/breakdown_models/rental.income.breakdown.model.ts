import { AmountTransaction } from "../transaction_models/amount.transaction.model";
import { Transaction } from "../transaction_models/transaction.model";
import { Breakdown } from "./breakdown.model";

export class RentalIncomeBreakdown implements Breakdown {

    private rentalIncomeAmount: Transaction;

    constructor(rentalIncomeAmount: Transaction) {
        this.rentalIncomeAmount = rentalIncomeAmount;
    }

    getTotalAmount(numberOfYears: number = 0): number {
        return this.rentalIncomeAmount.getProjectedValue(numberOfYears);
    }

}