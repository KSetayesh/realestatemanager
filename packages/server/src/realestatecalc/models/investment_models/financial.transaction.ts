import { TransactionsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";
import { Incomes } from "./incomes.model";
import { Expenses } from "./expenses.model";

export class FinancialTransaction implements IDTOConvertible<TransactionsDTO> {

    private incomes: Incomes;
    private expenses: Expenses;

    constructor(incomes: Incomes, expenses: Expenses) {
        this.incomes = incomes;
        this.expenses = expenses;
    }

    getTotalIncomes(): number {
        return this.incomes.getTotalIncomes();
    }

    getFutureDatedTotalIncomes(annualIncreaseRate: number = 0, numberOfYearsFromNow: number): number {
        return this.incomes.getFutureDatedTotalIncomes(annualIncreaseRate, numberOfYearsFromNow);
    }

    getTotalExpenses(): number {
        return this.expenses.getTotalExpenses();
    }

    getFutureDatedTotalExpenses(annualPropertyTaxIncreaseRate: number = 0,
        annualHomeInsuranceIncreaseRate: number = 0,
        annualHOAFeesIncreaseRate: number = 0,
        numberOfYearsFromNow: number): number {
        return this.expenses.getFutureDatedTotalExpenses(
            annualPropertyTaxIncreaseRate,
            annualHomeInsuranceIncreaseRate,
            annualHOAFeesIncreaseRate,
            numberOfYearsFromNow);
    }

    getRentalIncome(): number {
        return this.incomes.getRentalIncome();
    }

    getFutureDatedRentalIncome(annualIncreaseRate: number = 0, numberOfYearsFromNow: number): number {
        return this.incomes.getFutureDatedRentalIncome(annualIncreaseRate, numberOfYearsFromNow);
    }

    getFixedExpenses(): number {
        return this.expenses.getFixedExpenses();
    }

    getFutureDatedFixedExpenses(
        annualPropertyTaxIncreaseRate: number = 0,
        annualHomeInsuranceIncreaseRate: number = 0,
        annualHOAFeesIncreaseRate: number = 0,
        numberOfYearsFromNow: number): number {

        return this.expenses.getFutureDatedFixedExpenses(
            annualPropertyTaxIncreaseRate,
            annualHomeInsuranceIncreaseRate,
            annualHOAFeesIncreaseRate,
            numberOfYearsFromNow);
    }

    getRecurringExpenses(): number {
        return this.getRentalIncome() * (this.expenses.getRecurringExpenses() / 100);
    }

    getFutureDatedRecurringExpenses(annualRentalIncreaseRate: number = 0, numberOfYearsFromNow: number): number {
        return this.getFutureDatedRentalIncome(annualRentalIncreaseRate, numberOfYearsFromNow) *
            (this.expenses.getRecurringExpenses() / 100);
    }

    toDTO(): TransactionsDTO {
        return {
            incomes: this.incomes.toDTO(),
            expenses: this.expenses.toDTO(),
        }
    }

}