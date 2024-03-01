import { CashFlowDetailsDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";
import { MortgageBreakdown } from "./mortgage.breakdown";
import { PMIDetails } from "./pmidetails.model";
import { RecurringExpensesBreakdown } from "./recurring.expenses.breakdown.model";
import { AdditionalIncomeStreams } from "./additional.income.streams.model";

export class CashFlowDetails implements IDTOConvertible<CashFlowDetailsDTO> {

    private mortgagePayment: MortgageBreakdown;
    private pmiDetails: PMIDetails;
    private recurringExpensesTotal: RecurringExpensesBreakdown;
    private rentEstimate: number;
    private additionalIncomeStreamsTotal?: AdditionalIncomeStreams;

    constructor(mortgagePayment: MortgageBreakdown,
        pmiDetails: PMIDetails,
        recurringExpensesTotal: RecurringExpensesBreakdown,
        rentEstimate: number,
        additionalIncomeStreamsTotal?: AdditionalIncomeStreams) {

        this.mortgagePayment = mortgagePayment;
        this.pmiDetails = pmiDetails;
        this.recurringExpensesTotal = recurringExpensesTotal;
        this.rentEstimate = rentEstimate;
        this.additionalIncomeStreamsTotal = additionalIncomeStreamsTotal;
    }

    private getCashFlowAmount(): number {
        const expenses = this.mortgagePayment.getMonthlyMortgagePayment() + this.pmiDetails.getPMIAmount() + this.recurringExpensesTotal.getTotalRecurringCosts();
        const income = this.rentEstimate + this.recurringExpensesTotal.getTotalRecurringCosts();
        return income - expenses;
    }

    toDTO(): CashFlowDetailsDTO {
        return {
            totalAmount: this.getCashFlowAmount(),
            breakdown: {
                totalExpenses: {
                    mortgagePayment: this.mortgagePayment.getMonthlyMortgagePayment(),
                    pmi: this.pmiDetails.getPMIAmount(),
                    recurringExpensesTotal: this.recurringExpensesTotal.getTotalRecurringCosts(),
                },
                totalIncome: {
                    rent: this.rentEstimate,
                    additionalIncomeStreamsTotal: this.additionalIncomeStreamsTotal.getTotalIncomeAmount(),
                },
            },
        };
    }
}