import { MortgageWithAllExpensesBreakdownDTO, MortgageWithFixedExpensesBreakdownDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";
import { MortgageBreakdown } from "./mortgage.breakdown";
import { FixedMonthlyExpenses } from "./fixed.monthly.expenses.model";
import { RecurringExpensesBreakdown } from "./recurring.expenses.breakdown.model";

export class MonthlyExpenses implements IDTOConvertible<MortgageWithAllExpensesBreakdownDTO> {

    private mortgageBreakdown: MortgageBreakdown;
    private fixedMonthlyExpenses: FixedMonthlyExpenses;
    private recurringExpensesBreakdown: RecurringExpensesBreakdown;

    constructor(mortgageBreakdown: MortgageBreakdown,
        fixedMonthlyExpenses: FixedMonthlyExpenses,
        recurringExpensesBreakdown: RecurringExpensesBreakdown) {

        this.mortgageBreakdown = mortgageBreakdown;
        this.fixedMonthlyExpenses = fixedMonthlyExpenses;
        this.recurringExpensesBreakdown = recurringExpensesBreakdown;
    }

    toDTO(): MortgageWithAllExpensesBreakdownDTO {
        const totalCosts = this.mortgageBreakdown.getMonthlyMortgagePayment() + this.fixedMonthlyExpenses.getTotalCosts();
        const mortgageWithFixedExpensesBreakdownDTO: MortgageWithFixedExpensesBreakdownDTO = {
            totalCosts: totalCosts,
            breakdown: {
                mortgageBreakdown: this.mortgageBreakdown.toDTO(),
                fixedMonthlyExpenses: this.fixedMonthlyExpenses.toDTO(),
            },
        };

        return {
            totalCosts: totalCosts + this.recurringExpensesBreakdown.getTotalRecurringCosts(),
            breakdown: {
                mortgageWithFixedExpenses: mortgageWithFixedExpensesBreakdownDTO,
                recurringExpensesBreakdown: this.recurringExpensesBreakdown.toDTO(),
            },
        };
    }
}