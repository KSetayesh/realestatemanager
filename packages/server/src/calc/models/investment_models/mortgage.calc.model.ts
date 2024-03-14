import { AmountAndPercentageDTO, MortgageDetailsDTO } from "@realestatemanager/shared";
import { FinancingTerms } from "./financing.terms.model";
import { PMIDetails } from "./pmidetails.model";
import { FinancialTransaction } from "./financial.transaction";
import { IDTOConvertible } from "../idtoconvertible.model";

export class MortgageCalculator implements IDTOConvertible<MortgageDetailsDTO> {

    private purchasePrice: number;
    private downpayment: AmountAndPercentageDTO;
    private financingTerms: FinancingTerms;
    private financialTransaction: FinancialTransaction;
    private pmiDetails?: PMIDetails;

    constructor(purchasePrice: number,
        downpayment: AmountAndPercentageDTO,
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
        return this.financialTransaction.getRentalIncome();
    }

    getRecurringExpenses(): number {
        return this.financialTransaction.getRecurringExpenses();
    }

    getFixedExpenses(): number {
        return this.financialTransaction.getFixedExpenses();
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

    private getLoan(): AmountAndPercentageDTO {
        return {
            amount: this.getLoanAmount(),
            percentage: this.getLoanPercentage(),
        };
    }

    toDTO(): MortgageDetailsDTO {
        return {
            purchasePrice: this.purchasePrice,
            downpayment: this.downpayment,
            loanAmount: this.getLoan(),
            financingTerms: this.financingTerms.toDTO(),
            transactions: this.financialTransaction.toDTO(),
            pmiDetails: this.pmiDetails.toDTO(),
        }
    }

}