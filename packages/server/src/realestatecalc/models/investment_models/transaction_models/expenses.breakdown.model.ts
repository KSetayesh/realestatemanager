import { ExpensesDTO, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { FixedExpensesBreakdown } from "../breakdown_models/fixed.expenses.breakdown.model";
import { RecurringExpensesBreakdown } from "../breakdown_models/recurring.expenses.breakdown.model";
import { InitialCostsBreakdown } from "../breakdown_models/initial.costs.breakdown.model";

export class ExpensesBreakdown implements IDTOConvertible<ExpensesDTO> {
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

    calculateRecurringExpenses(
        rentalAmount: ValueAmountInput,
        rentalGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ) {
        return this.recurringExpenses.calculateRecurringExpenses(rentalAmount, rentalGrowthRate, numberOfYears);
    }

    getRecurringExpensesList(): ValueRateInput[] {
        return this.recurringExpenses.getRecurringExpensesList();
    }

    // getFixedExpenses(numberOfYears: number = 0): number {
    //     return this.fixedMonthlyExpenses.getTotalAmount(numberOfYears);
    // }

    // getRecurringExpenses(numberOfYears: number = 0): number {
    //     return this.recurringExpenses.getTotalAmount(numberOfYears);
    // }

    // getInitialCosts(): number {
    //     return this.initialCosts.getTotalAmount();
    // }

    toDTO(): ExpensesDTO {
        return {
            fixedMonthlyExpenses: this.fixedMonthlyExpenses.toDTO(),
            recurringExpenses: this.recurringExpenses.toDTO(),
            initialCosts: this.initialCosts.toDTO(),
        }
    }

}