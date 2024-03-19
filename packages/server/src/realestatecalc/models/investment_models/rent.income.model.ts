import { Income } from "./transaction.model";

export class RentIncome implements Income {

    private rentEstimate: number;

    constructor(rentEstimate: number) {
        this.rentEstimate = rentEstimate;
    }

    getFutureDatedRentalIncome(annualIncreaseRate: number = 0, numberOfYearsFromNow: number): number {
        return this.totalIncomes() * Math.pow(1 + (annualIncreaseRate / 100), numberOfYearsFromNow);
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