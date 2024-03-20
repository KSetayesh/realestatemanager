import { Transaction } from "./transaction.model";

export abstract class Expense extends Transaction {
    isExpense(): boolean {
        return true;
    }
}