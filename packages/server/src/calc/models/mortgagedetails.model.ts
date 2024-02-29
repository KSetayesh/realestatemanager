import { FixedMonthlyExpensesDTO, InterestType, MortgageDetailsDTO, ValueInput, ValueType } from "@realestatemanager/shared";
import { LoanDetails } from "./loandetails.model";

export class MortgageDetails extends LoanDetails<MortgageDetailsDTO> {
    private downPaymentPercentage: number;
    private monthlyPropertyTaxAmount?: number;
    private monthlyHomeInsuranceAmount?: number;
    private monthlyHOAFeesAmount?: number;
    private pmiRate?: number;
    private pmiDropoffPoint?: number;

    constructor(
        loanAmount: number,
        annualInterestRate: number,
        termInYears: number,
        interestType: InterestType,
        downPaymentPercentage: number,
        pmiRate?: number,
        pmiDropoffPoint?: number,
        monthlyPropertyTaxAmount?: number,
        monthlyHomeInsuranceAmount?: number,
        monthlyHOAFeesAmount?: number
    ) {
        super(loanAmount, annualInterestRate, termInYears, interestType);
        this.downPaymentPercentage = downPaymentPercentage;
        this.pmiRate = pmiRate;
        this.pmiDropoffPoint = pmiDropoffPoint;
        this.monthlyPropertyTaxAmount = monthlyPropertyTaxAmount;
        this.monthlyHomeInsuranceAmount = monthlyHomeInsuranceAmount;
        this.monthlyHOAFeesAmount = monthlyHOAFeesAmount;
    }

    calculateMortgagePayment(calculateWithPMI: boolean = false): number {
        const monthlyInterestRate = this.getMonthlyInterestRate() / 100;
        const numberOfPayments = this.getNumberOfPayments();
        const loanAmount = this.getLoanAmount(); //this.calculateLoanAmount(mortgage.principal, mortgage.downPaymentPercentage);
        let monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        // Add PMI calculation if down payment is less than 20%
        if (calculateWithPMI) {
            monthlyPayment += this.calculatePMIAmount();
        }

        // monthlyPayment += (this.monthlyPropertyTaxAmount +
        //     this.monthlyHomeInsuranceAmount +
        //     this.monthlyHOAFeesAmount);

        return monthlyPayment;
    }

    calculateMortgagePaymentWithFixedMonthlyExpenses(calculateWithPMI: boolean = false): number {
        return this.calculateMortgagePayment(calculateWithPMI) + this.calculateFixedMonthlyExpenses();
    }

    calculatePMIAmount(): number {
        if (this.isPMI()) {
            // Assume PMI rate of 0.75% of the loan amount annually as an example
            const annualPMI = this.getLoanAmount() * (this.pmiRate / 100); //  0.0075;
            const monthlyPMI = annualPMI / 12;
            return monthlyPMI;
        }
        return 0;
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

    getMonthlyPropertyTaxAmount(): number {
        return this.monthlyPropertyTaxAmount;
    }

    getMonthlyHomeInsuranceAmount(): number {
        return this.monthlyHomeInsuranceAmount;
    }

    getMonthlyHOAFeesAmount(): number {
        return this.monthlyHOAFeesAmount;
    }

    getPMIRate(): number {
        return this.pmiRate;
    }

    getPMIDropoffPoint(): number {
        return this.pmiDropoffPoint;
    }

    calculateFixedMonthlyExpenses(): number {
        return this.createFixedMonthlyExpensesDTO().totalCosts;
    }

    createFixedMonthlyExpensesDTO(): FixedMonthlyExpensesDTO {
        const monthlyPropertyTaxAmount = this.getMonthlyPropertyTaxAmount();
        const monthlyHomeInsuranceAmount = this.getMonthlyHomeInsuranceAmount();
        const monthlyHOAFeesAmount = this.getMonthlyHOAFeesAmount();
        const totalCosts = monthlyPropertyTaxAmount + monthlyHomeInsuranceAmount + monthlyHOAFeesAmount;

        return {
            totalCosts: totalCosts,
            breakdown: {
                monthlyPropertyTaxAmount: monthlyPropertyTaxAmount,
                monthlyHomeInsuranceAmount: monthlyHomeInsuranceAmount,
                monthlyHOAFeesAmount: monthlyHOAFeesAmount,
            },
        };
    }

    toDTO(): MortgageDetailsDTO {
        return {
            loanAmount: this.getLoanAmount(),
            annualInterestRate: this.getAnnualInterestRate(),
            termInYears: this.getTermInYears(),
            interestType: this.getInterestType(),
            downPaymentPercentage: this.downPaymentPercentage,
            pmiRate: this.pmiRate,
            monthlyPropertyTax: {
                type: ValueType.AMOUNT,
                amount: this.monthlyPropertyTaxAmount,
            },
            monthlyHomeInsuranceAmount: {
                type: ValueType.AMOUNT,
                amount: this.monthlyHomeInsuranceAmount,
            },
            monthlyHOAFeesAmount: {
                type: ValueType.AMOUNT,
                amount: this.monthlyHOAFeesAmount,
            },
        };
    }

}


