import { InterestType, MortgageDetailsDTO } from "@realestatemanager/shared";
import { LoanDetails } from "./loandetails.model";

export class MortgageDetails extends LoanDetails<MortgageDetailsDTO> {
    private downPaymentPercentage: number;
    private pmiRate: number;
    private monthlyPropertyTaxAmount?: number;
    private monthlyHomeInsuranceAmount?: number;
    private monthlyHOAFeesAmount?: number;

    constructor(
        principal: number,
        annualInterestRate: number,
        termInYears: number,
        interestType: InterestType,
        downPaymentPercentage: number,
        pmiRate: number,
        monthlyPropertyTaxAmount?: number,
        monthlyHomeInsuranceAmount?: number,
        monthlyHOAFeesAmount?: number
        // closingCosts?: number
    ) {
        super(principal, annualInterestRate, termInYears, interestType);
        this.downPaymentPercentage = downPaymentPercentage;
        this.pmiRate = pmiRate;
        this.monthlyPropertyTaxAmount = monthlyPropertyTaxAmount;
        this.monthlyHomeInsuranceAmount = monthlyHomeInsuranceAmount;
        this.monthlyHOAFeesAmount = monthlyHOAFeesAmount;
        //    this.closingCosts = closingCosts;
    }

    calculateMortgagePayment(): number {
        const monthlyInterestRate = this.getMonthlyInterestRate() / 100;
        const numberOfPayments = this.getNumberOfPayments();
        const loanAmount = this.getLoanAmount(); //this.calculateLoanAmount(mortgage.principal, mortgage.downPaymentPercentage);
        let monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        // Add PMI calculation if down payment is less than 20%
        if (this.isPMI()) {
            // Assume PMI rate of 0.75% of the loan amount annually as an example
            const annualPMI = loanAmount * (this.pmiRate / 100); //  0.0075;
            const monthlyPMI = annualPMI / 12;
            monthlyPayment += monthlyPMI;
        }

        monthlyPayment += (this.monthlyPropertyTaxAmount +
            this.monthlyHomeInsuranceAmount +
            this.monthlyHOAFeesAmount);

        return monthlyPayment;
    }

    calculateTotalCostOfMortgage(): number {
        return this.calculateMortgagePayment() * this.getNumberOfPayments();
    }

    isPMI(): boolean {
        return this.downPaymentPercentage < 20;
    }

    getDownPaymentPercentage(): number {
        return this.downPaymentPercentage;
    }

    // getClosingCostsAmount(): number {
    //     return this.closingCosts;
    // }

    toDTO(): MortgageDetailsDTO {
        return {
            loanAmount: this.getLoanAmount(),
            annualInterestRate: this.getAnnualInterestRate(),
            termInYears: this.getTermInYears(),
            interestType: this.getInterestType(),
            downPaymentPercentage: this.downPaymentPercentage,
            pmiRate: this.pmiRate,
            closingCosts: null, // this.closingCosts,
        };
    }
}


