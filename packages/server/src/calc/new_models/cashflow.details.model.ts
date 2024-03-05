import { CashFlowDetailsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";
import { MortgageBreakdown } from "./mortgage.breakdown";
import { PMIDetails } from "./pmidetails.model";
import { AdditionalIncomeStreams } from "./additional.income.streams.model";
import { RecurringMonthlyExpenses } from "./recurring.monthly.expenses.model";

export class CashFlowDetails implements IDTOConvertible<CashFlowDetailsDTO> {

    private mortgagePayment: MortgageBreakdown;
    private pmiDetails: PMIDetails;
    private recurringMonthlyExpenses: RecurringMonthlyExpenses;
    private rentEstimate: number;
    private additionalIncomeStreamsTotal?: AdditionalIncomeStreams;

    constructor(mortgagePayment: MortgageBreakdown,
        pmiDetails: PMIDetails,
        recurringMonthlyExpenses: RecurringMonthlyExpenses,
        rentEstimate: number,
        additionalIncomeStreamsTotal?: AdditionalIncomeStreams) {

        this.mortgagePayment = mortgagePayment;
        this.pmiDetails = pmiDetails;
        this.recurringMonthlyExpenses = recurringMonthlyExpenses;
        this.rentEstimate = rentEstimate;
        this.additionalIncomeStreamsTotal = additionalIncomeStreamsTotal;
    }

    private getCashFlowAmount(): number {
        const expenses = this.mortgagePayment.getMonthlyMortgagePayment() + this.pmiDetails.getPMIAmount() + this.recurringMonthlyExpenses.getTotalRecurringCosts();
        const income = this.rentEstimate + this.recurringMonthlyExpenses.getTotalRecurringCosts();
        return income - expenses;
    }

    toDTO(): CashFlowDetailsDTO {
        return {
            totalAmount: this.getCashFlowAmount(),
            breakdown: {
                totalExpenses: {
                    mortgagePayment: this.mortgagePayment.getMonthlyMortgagePayment(),
                    pmi: this.pmiDetails.getPMIAmount(),
                    recurringExpensesTotal: this.recurringMonthlyExpenses.getTotalRecurringCosts(),
                },
                totalIncome: {
                    rent: this.rentEstimate,
                    additionalIncomeStreamsTotal: this.additionalIncomeStreamsTotal.getTotalIncomeAmount(),
                },
            },
        };
    }
}