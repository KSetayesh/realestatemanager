import { Incomes } from "./transaction.model";

export class RentIncome implements Incomes {

    private rentEstimate: number;

    constructor(rentEstimate: number) {
        this.rentEstimate = rentEstimate;
    }

    totalIncomes(): number {
        return this.rentEstimate;
    }

    isIncome(): boolean {
        return true;
    }

    isExpense(): boolean {
        return false;
    }

}