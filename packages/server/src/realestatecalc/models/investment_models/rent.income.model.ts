import { Income } from "./transaction.model";

export class RentIncome implements Income {

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