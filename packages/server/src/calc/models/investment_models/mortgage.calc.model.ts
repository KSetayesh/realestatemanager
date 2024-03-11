import { AmountAndPercentageDTO } from "@realestatemanager/shared";
import { FinancingTerms } from "./financing.terms.model";
import { PMIDetails } from "./pmidetails.model";
import { RecurringFinancialActivity } from "./recurring.monthly.financial.activity.model";

export class MortgageCalculator {

    private purchasePrice: number;
    private downpayment: AmountAndPercentageDTO;
    private financingTerms: FinancingTerms;
    private recurringFinancialActivity: RecurringFinancialActivity;
    private pmiDetails?: PMIDetails;

    constructor(purchasePrice: number,
        downpayment: AmountAndPercentageDTO,
        financingTerms: FinancingTerms,
        recurringFinancialActivity: RecurringFinancialActivity,
        pmiDetails?: PMIDetails) {

        this.purchasePrice = purchasePrice;
        this.downpayment = downpayment;
        this.financingTerms = financingTerms;
        this.recurringFinancialActivity = recurringFinancialActivity;
        this.pmiDetails = pmiDetails;
    }

    getPurchasePrice(): number {
        return this.purchasePrice;
    }

    getLoanAmount(): number {
        return this.purchasePrice - this.getDownPaymentAmount(); // this.financingTerms.getLoanAmount();
    }

    getDownpaymentAmountAndPercentage(): AmountAndPercentageDTO {
        return this.downpayment;
    }

    getDownPaymentAmount(): number {
        return this.downpayment.amount;
        //return Utility.round(this.getPurchasePrice() * (this.getDownPaymentPercentage() / 100));
    }

    getLoanPercentage(): number {
        return 100 - this.getDownPaymentPercentage();
    }

    getDownPaymentPercentage(): number {
        return this.downpayment.percentage;
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
            return this.getDownPaymentPercentage() < 20;
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