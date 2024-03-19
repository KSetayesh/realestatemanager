import { ExpensesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";
import { FixedMonthlyExpenses } from "./fixed.monthly.expenses.model";
import { RecurringMonthlyExpenses } from "./recurring.monthly.expenses.model";

export class Expenses implements IDTOConvertible<ExpensesDTO> {
    private fixedMonthlyExpenses: FixedMonthlyExpenses;
    private recurringExpenses: RecurringMonthlyExpenses;

    constructor(fixedMonthlyExpenses: FixedMonthlyExpenses, recurringExpenses: RecurringMonthlyExpenses) {
        this.fixedMonthlyExpenses = fixedMonthlyExpenses;
        this.recurringExpenses = recurringExpenses;
    }

    getFixedExpenses(): number {
        return this.fixedMonthlyExpenses.totalExpenses();
    }

    getFutureDatedFixedExpenses(
        annualPropertyTaxIncreaseRate: number = 0,
        annualHomeInsuranceIncreaseRate: number = 0,
        annualHOAFeesIncreaseRate: number = 0,
        numberOfYearsFromNow: number): number {

        return this.fixedMonthlyExpenses.getFutureDatedTotalExpenses(
            annualPropertyTaxIncreaseRate,
            annualHomeInsuranceIncreaseRate,
            annualHOAFeesIncreaseRate,
            numberOfYearsFromNow);
    }

    getRecurringExpenses(): number {
        return this.recurringExpenses.totalExpenses();
    }

    toDTO(): ExpensesDTO {
        return {
            fixedMonthlyExpenses: this.fixedMonthlyExpenses.toDTO(),
            recurringExpenses: this.recurringExpenses.toDTO(),
        }
    }

}