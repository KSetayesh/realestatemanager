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

    getFutureDatedTotalExpenses(
        annualPropertyTaxIncreaseRate: number = 0,
        annualHomeInsuranceIncreaseRate: number = 0,
        annualHOAFeesIncreaseRate: number = 0,
        numberOfYearsFromNow: number): number {

        const futureDatedAmount = (principal: number, annualIncreaseRate: number): number => {
            return principal * Math.pow(1 + (annualIncreaseRate / 100), numberOfYearsFromNow);
        };

        const monthlyPropertyTaxAmount = futureDatedAmount(this.monthlyPropertyTaxAmount, annualPropertyTaxIncreaseRate);
        const monthlyHomeInsuranceAmount = futureDatedAmount(this.monthlyHomeInsuranceAmount, annualHomeInsuranceIncreaseRate);
        const monthlyHOAFeesAmount = futureDatedAmount(this.monthlyHOAFeesAmount, annualHOAFeesIncreaseRate);

        return monthlyPropertyTaxAmount + monthlyHomeInsuranceAmount + monthlyHOAFeesAmount;
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