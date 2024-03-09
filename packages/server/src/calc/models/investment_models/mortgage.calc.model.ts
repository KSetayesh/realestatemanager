import { Utility } from "@realestatemanager/shared";
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

    getPurchasePrice(): number {
        return this.purchasePrice;
    }

    getLoanAmount(): number {
        return this.financingTerms.getLoanAmount();
    }

    getDownPaymentAmount(): number {
        return Utility.round(this.purchasePrice * (this.downpaymentPercentage / 100));
    }

    getRentalIncome(): number {
        return this.recurringFinancialActivity.getRentalIncome();
    }

    getRecurringExpenses(): number {
        return this.recurringFinancialActivity.getRecurringExpenses();
    }

    getFixedExpenses(): number {
        return this.recurringFinancialActivity.getFixedExpenses();
    }

    getNumberOfPayments(): number {
        return this.financingTerms.getNumberOfPayments();
    }

    getMortgageAmountWithFixedMonthlyExpenses(): number {
        return this.calculateMortgagePayment() + this.getFixedExpenses();
    }

    calculateMortgagePayment(calculateWithPMI: boolean = false): number {
        const monthlyInterestRate = this.getMonthlyInterestRate() / 100;
        const numberOfPayments = this.getNumberOfPayments();
        const loanAmount = this.getLoanAmount(); //this.calculateLoanAmount(mortgage.principal, mortgage.downPaymentPercentage);
        let monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        // Add PMI calculation if down payment is less than 20%
        if (calculateWithPMI) {
            monthlyPayment += this.getPMIAmount();
        }

        // monthlyPayment += (this.monthlyPropertyTaxAmount +
        //     this.monthlyHomeInsuranceAmount +
        //     this.monthlyHOAFeesAmount);

        return monthlyPayment;
    }

    getAnnualInterestRate(): number {
        return this.financingTerms.getAnnualInterestRate();
    }

    getMonthlyInterestRate(): number {
        return this.getAnnualInterestRate() / 12;
    }

    getPMIAmount(): number {
        const isPMI = (): boolean => {
            return this.downpaymentPercentage < 20;
        };

        if (isPMI()) {
            // Assume PMI rate of 0.75% of the loan amount annually as an example
            const annualPMI = this.getLoanAmount() * (this.getPmiRate() / 100); //  0.0075;
            const monthlyPMI = annualPMI / 12;
            return monthlyPMI;
        }
        return 0;
    }

    private getPmiRate(): number {
        return this.pmiDetails.getPmiRate();
    }

}