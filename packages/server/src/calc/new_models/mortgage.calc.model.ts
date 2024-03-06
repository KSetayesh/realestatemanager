import { FinancingTerms } from "./financing.terms.model";
import { PMIDetails } from "./pmidetails.model";
import { RecurringFinancialActivity } from "./recurring.monthly.financial.activity.model";

export class MortgageCalculator {

    private purchasePrice: number;
    private downpaymentPercentage: number;
    private financingTerms: FinancingTerms;
    private recurringFinancialActivity: RecurringFinancialActivity;
    private pmiDetails?: PMIDetails;

    constructor(purchasePrice: number,
        downpaymentPercentage: number,
        financingTerms: FinancingTerms,
        recurringFinancialActivity: RecurringFinancialActivity,
        pmiDetails?: PMIDetails) {

        this.purchasePrice = purchasePrice;
        this.downpaymentPercentage = downpaymentPercentage;
        this.financingTerms = financingTerms;
        this.recurringFinancialActivity = recurringFinancialActivity;
        this.pmiDetails = pmiDetails;
    }

}