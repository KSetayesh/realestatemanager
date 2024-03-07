import { Incomes } from "./incomes.model";

export class RentIncome implements Incomes {

    private rentEstimate: number;

    constructor(rentEstimate: number) {
        this.rentEstimate = rentEstimate;
    }

    totalIncomes(): number {
        return this.rentEstimate;
    }

}