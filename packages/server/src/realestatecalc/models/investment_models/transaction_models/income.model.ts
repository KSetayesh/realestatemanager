import { Transaction } from "./transaction.model";

export abstract class Income extends Transaction {
    isExpense(): boolean {
        return false;
    }
}