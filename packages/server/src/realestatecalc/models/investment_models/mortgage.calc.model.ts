import { MortgageDetailsDTO, Utility } from "@realestatemanager/shared";
import { FinancingTerms } from "./financing.terms.model";
import { PMIDetails } from "./pmidetails.model";
import { IDTOConvertible } from "../idtoconvertible.model";
import { FinancialTransaction } from "./transaction_models/financial.transaction";
import { Transaction } from "./transaction_models/transaction.model";

export class MortgageCalculator implements IDTOConvertible<MortgageDetailsDTO> {

    private purchasePrice: number;
    private downpayment: Transaction;
    private financingTerms: FinancingTerms;
    private financialTransaction: FinancialTransaction;
    private pmiDetails?: PMIDetails;

    constructor(purchasePrice: number,
        downpayment: Transaction,
        financingTerms: FinancingTerms,
        financialTransaction: FinancialTransaction,
        pmiDetails?: PMIDetails) {

        this.purchasePrice = purchasePrice;
        this.downpayment = downpayment;
        this.financingTerms = financingTerms;
        this.financialTransaction = financialTransaction;
        this.pmiDetails = pmiDetails;
    }

    getPurchasePrice(): number {
        return this.purchasePrice;
    }

    getLoanAmount(): number {
        return this.purchasePrice - this.getDownPaymentAmount(); // this.financingTerms.getLoanAmount();
    }

    getDownPaymentAmount(): number {
        return this.downpayment.getProjectedValue();
    }

    getLoanPercentage(): number {
        return 100 - this.getDownPaymentPercentage();
    }

    getDownPaymentPercentage(): number {
        return this.downpayment.getRate();
    }

    getRentalIncome(numberOfYears: number = 0): number {
        return this.financialTransaction.getRentalIncome(numberOfYears);
    }

    getRecurringExpenses(numberOfYears: number = 0): number {
        return this.financialTransaction.getRecurringExpenses(numberOfYears);
    }

    getFixedExpenses(numberOfYears: number = 0): number {
        return this.financialTransaction.getFixedExpenses(numberOfYears);
    }

    getInitialCosts(): number {
        return this.financialTransaction.getInitialCosts();
    }

    getNumberOfPayments(): number {
        return this.financingTerms.getNumberOfPayments();
    }

    getMortgageAmountWithFixedMonthlyExpenses(numberOfYears: number = 0): number {
        const mortgagePayment = this.calculateMortgagePayment();
        const fixedExpenses = this.getFixedExpenses(numberOfYears);
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
            transactions: this.financialTransaction.toDTO(),
            pmiDetails: this.pmiDetails.toDTO(),
        }
    }

}