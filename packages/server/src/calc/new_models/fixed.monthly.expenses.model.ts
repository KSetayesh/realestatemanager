import { FixedMonthlyExpensesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export class FixedMonthlyExpenses implements IDTOConvertible<FixedMonthlyExpensesDTO> {

    private monthlyPropertyTaxAmount: number;
    private monthlyHomeInsuranceAmount: number;
    private monthlyHOAFeesAmount: number;

    constructor(monthlyPropertyTaxAmount: number,
        monthlyHomeInsuranceAmount: number,
        monthlyHOAFeesAmount: number) {

        this.monthlyPropertyTaxAmount = monthlyPropertyTaxAmount;
        this.monthlyHomeInsuranceAmount = monthlyHomeInsuranceAmount;
        this.monthlyHOAFeesAmount = monthlyHOAFeesAmount;
    }

    getTotalCosts(): number {
        return this.toDTO().totalCosts;
    }

    toDTO(): FixedMonthlyExpensesDTO {
        const monthlyPropertyTaxAmount = this.monthlyPropertyTaxAmount;
        const monthlyHomeInsuranceAmount = this.monthlyHomeInsuranceAmount;
        const monthlyHOAFeesAmount = this.monthlyHOAFeesAmount;
        const totalCosts = monthlyPropertyTaxAmount + monthlyHomeInsuranceAmount + monthlyHOAFeesAmount;
        return {
            totalCosts: totalCosts,
            breakdown: {
                monthlyPropertyTaxAmount: monthlyPropertyTaxAmount,
                monthlyHomeInsuranceAmount: monthlyHomeInsuranceAmount,
                monthlyHOAFeesAmount: monthlyHOAFeesAmount,
            }
        }

    }
}