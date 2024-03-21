import { ExpensesDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { FixedExpensesBreakdown } from "../breakdown_models/fixed.expenses.breakdown.model";
import { RecurringExpensesBreakdown } from "../breakdown_models/recurring.expenses.breakdown.model";
import { InitialCostsBreakdown } from "../breakdown_models/initial.costs.breakdown.model";

export class Expenses implements IDTOConvertible<ExpensesDTO> {
    private fixedMonthlyExpenses: FixedExpensesBreakdown;
    private recurringExpenses: RecurringExpensesBreakdown;
    private initialCosts: InitialCostsBreakdown;

    constructor(
        fixedMonthlyExpenses: FixedExpensesBreakdown,
        recurringExpenses: RecurringExpensesBreakdown,
        initialCosts: InitialCostsBreakdown,
    ) {
        this.fixedMonthlyExpenses = fixedMonthlyExpenses;
        this.recurringExpenses = recurringExpenses;
        this.initialCosts = initialCosts;
    }

    getFixedExpenses(numberOfYears: number = 0): number {
        return this.fixedMonthlyExpenses.getTotalAmount(numberOfYears);
    }

    getRecurringExpenses(numberOfYears: number = 0): number {
        return this.recurringExpenses.getTotalAmount(numberOfYears);
    }

    getInitialCosts(): number {
        return this.initialCosts.getTotalAmount();
    }

    toDTO(): ExpensesDTO {
        return {
            fixedMonthlyExpenses: this.fixedMonthlyExpenses.toDTO(),
            recurringExpenses: this.recurringExpenses.toDTO(),
            initialCosts: this.initialCosts.toDTO(),
        }
    }

}