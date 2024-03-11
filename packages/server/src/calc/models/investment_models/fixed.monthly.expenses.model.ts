import { FixedMonthlyExpensesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";
import { Expense } from "./transaction.model";

export class FixedMonthlyExpenses implements Expense, IDTOConvertible<FixedMonthlyExpensesDTO> {

    private monthlyPropertyTaxAmount: number;
    private monthlyHomeInsuranceAmount: number;
    private monthlyHOAFeesAmount: number;

    constructor(
        monthlyPropertyTaxAmount: number,
        monthlyHomeInsuranceAmount: number,
        monthlyHOAFeesAmount: number
    ) {
        this.monthlyPropertyTaxAmount = monthlyPropertyTaxAmount;
        this.monthlyHomeInsuranceAmount = monthlyHomeInsuranceAmount;
        this.monthlyHOAFeesAmount = monthlyHOAFeesAmount;
    }

    totalExpenses(): number {
        return this.monthlyPropertyTaxAmount + this.monthlyHomeInsuranceAmount + this.monthlyHOAFeesAmount;
    }

    isIncome(): boolean {
        return false;
    }

    isExpense(): boolean {
        return true;
    }

    toDTO(): FixedMonthlyExpensesDTO {
        return {
            monthlyPropertyTax: this.monthlyPropertyTaxAmount,
            monthlyHomeInsuranceAmount: this.monthlyHomeInsuranceAmount,
            monthlyHOAFeesAmount: this.monthlyHOAFeesAmount,
        };
    }

}