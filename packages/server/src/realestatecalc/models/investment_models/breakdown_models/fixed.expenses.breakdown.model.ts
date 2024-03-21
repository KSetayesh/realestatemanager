import { FixedMonthlyExpensesDTO } from "@realestatemanager/shared";
import { AmountTransaction } from "../transaction_models/amount.transaction.model";
import { Breakdown } from "./breakdown.model";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Transaction } from "../transaction_models/transaction.model";

export class FixedExpensesBreakdown implements IDTOConvertible<FixedMonthlyExpensesDTO>, Breakdown {

    private monthlyPropertyTaxAmount: Transaction;
    private monthlyHOAFeesAmount: Transaction;
    private monthlyHomeInsuranceAmount: Transaction;

    constructor(
        monthlyPropertyTaxAmount: Transaction,
        monthlyHOAFeesAmount: Transaction,
        monthlyHomeInsuranceAmount: Transaction,
    ) {

        this.monthlyPropertyTaxAmount = monthlyPropertyTaxAmount;
        this.monthlyHOAFeesAmount = monthlyHOAFeesAmount;
        this.monthlyHomeInsuranceAmount = monthlyHomeInsuranceAmount;
    }

    getTotalAmount(numberOfYears: number = 0): number {
        return this.getPropertyTaxAmount(numberOfYears) +
            this.getMonthlyHOAFeesAmount(numberOfYears) +
            this.getMonthlyHomeInsuranceAmount(numberOfYears);
    }

    toDTO(numberOfYears: number = 0): FixedMonthlyExpensesDTO {
        return {
            monthlyPropertyTax: this.getPropertyTaxAmount(numberOfYears),
            monthlyHomeInsuranceAmount: this.getMonthlyHomeInsuranceAmount(numberOfYears),
            monthlyHOAFeesAmount: this.getMonthlyHOAFeesAmount(numberOfYears),
        }
    }

    private getPropertyTaxAmount(numberOfYears: number = 0): number {
        return this.monthlyPropertyTaxAmount.getProjectedValue(numberOfYears);
    }

    private getMonthlyHOAFeesAmount(numberOfYears: number = 0): number {
        return this.monthlyHOAFeesAmount.getProjectedValue(numberOfYears);
    }

    private getMonthlyHomeInsuranceAmount(numberOfYears: number = 0): number {
        return this.monthlyHomeInsuranceAmount.getProjectedValue(numberOfYears);
    }

}