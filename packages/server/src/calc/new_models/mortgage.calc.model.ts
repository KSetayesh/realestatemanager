import { InterestType } from "@realestatemanager/shared";
import { FinancingTerms } from "./financing.terms.model";
import { FixedMonthlyExpenses } from "./fixed.monthly.expenses.model";
import { PMIDetails } from "./pmidetails.model";

export class MortgageCalculator {

    private financingTerms: FinancingTerms;
    private fixedMonthlyExpenses: FixedMonthlyExpenses;
    private pmiDetails?: PMIDetails;

    constructor(financingTerms: FinancingTerms,
        fixedMonthlyExpenses: FixedMonthlyExpenses,
        pmiDetails?: PMIDetails) {

        this.financingTerms = financingTerms;
        this.fixedMonthlyExpenses = fixedMonthlyExpenses;
        this.pmiDetails = pmiDetails;
    }

}