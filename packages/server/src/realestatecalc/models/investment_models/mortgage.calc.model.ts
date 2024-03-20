import { AmountAndPercentageDTO, MortgageDetailsDTO, Utility } from "@realestatemanager/shared";
import { FinancingTerms } from "./financing.terms.model";
import { PMIDetails } from "./pmidetails.model";
import { IDTOConvertible } from "../idtoconvertible.model";
import { FinancialTransactions } from "./transaction_models/financial.transactions";

export class MortgageCalculator implements IDTOConvertible<MortgageDetailsDTO> {

    private purchasePrice: number;
    private downpayment: AmountAndPercentageDTO;
    private financingTerms: FinancingTerms;
    private financialTransactions: FinancialTransactions;
    private pmiDetails?: PMIDetails;

    constructor(purchasePrice: number,
        downpayment: AmountAndPercentageDTO,
        financingTerms: FinancingTerms,
        financialTransactions: FinancialTransactions,
        pmiDetails?: PMIDetails) {

        this.purchasePrice = purchasePrice;
        this.downpayment = downpayment;
        this.financingTerms = financingTerms;
        this.financialTransactions = financialTransactions;
        this.pmiDetails = pmiDetails;
    }

    getPurchasePrice(): number {
        return this.purchasePrice;
    }

    getLoanAmount(): number {
        return this.purchasePrice - this.getDownPaymentAmount(); // this.financingTerms.getLoanAmount();
    }

    getDownPaymentAmount(): number {
        return this.downpayment.amount;
    }

    getLoanPercentage(): number {
        return 100 - this.getDownPaymentPercentage();
    }

    getDownPaymentPercentage(): number {
        return this.downpayment.percentage;
    }

    getRentalIncome(numberOfYearsFromNow: number = 0): number {
        return this.financialTransactions.getRentalIncome(numberOfYearsFromNow);
    }

    getRecurringExpenses(numberOfYearsFromNow: number = 0): number {
        return this.financialTransactions.getTotalRecurringExpenses(numberOfYearsFromNow);
    }

    getFixedExpenses(numberOfYearsFromNow: number = 0): number {
        return this.financialTransactions.getTotalFixedExpenses(numberOfYearsFromNow);
    }

    getNumberOfPayments(): number {
        return this.financingTerms.getNumberOfPayments();
    }

    getMortgageAmountWithFixedMonthlyExpenses(numberOfYearsFromNow: number = 0): number {
        const mortgagePayment = this.calculateMortgagePayment();
        const fixedExpenses = this.getFixedExpenses(numberOfYearsFromNow);
        return mortgagePayment + fixedExpenses;
    }

    calculateMortgagePayment(calculateWithPMI: boolean = false): number {
        const monthlyInterestRate = this.getMonthlyInterestRate() / 100;
        const numberOfPayments = this.getNumberOfPayments();
        const loanAmount = this.getLoanAmount();
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

    toDTO(): MortgageDetailsDTO {
        return {
            purchasePrice: this.purchasePrice,
            downpayment: {
                percentage: Utility.round(this.getDownPaymentPercentage()),
                amount: Utility.round(this.getDownPaymentAmount()),
            },
            loanAmount: {
                amount: Utility.round(this.getLoanAmount()),
                percentage: Utility.round(this.getLoanPercentage()),
            },
            financingTerms: this.financingTerms.toDTO(),
            transactions: this.financialTransactions.toDTO(),
            pmiDetails: this.pmiDetails.toDTO(),
        }
    }

}