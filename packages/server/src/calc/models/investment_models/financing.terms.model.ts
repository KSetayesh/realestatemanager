import { FinancingTermsDTO, InterestType } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class FinancingTerms implements IDTOConvertible<FinancingTermsDTO> {

    private loanAmount: number;
    private annualInterestRate: number;
    private interestType: InterestType;
    private termInYears: number;
    private monthlyPayment?: number;
    private interestOnlyPeriod?: number;

    constructor(loanAmount: number,
        annualInterestRate: number,
        interestType: InterestType,
        termInYears: number,
        monthlyPayment: number,
        interestOnlyPeriod: number) {

        this.loanAmount = loanAmount;
        this.annualInterestRate = annualInterestRate;
        this.interestType = interestType;
        this.termInYears = termInYears;
        this.monthlyPayment = monthlyPayment;
        this.interestOnlyPeriod = interestOnlyPeriod;
    }

    getNumberOfPayments(): number {
        return this.termInYears * 12;
    }

    getAnnualInterestRate(): number {
        return this.annualInterestRate;
    }

    getLoanAmount(): number {
        return this.loanAmount;
    }

    toDTO(): FinancingTermsDTO {
        return {
            loanAmount: this.loanAmount,
            annualInterestRate: this.annualInterestRate,
            interestType: this.interestType,
            termInYears: this.termInYears,
            monthlyPayment: this.monthlyPayment,
            interestOnlyPeriod: this.interestOnlyPeriod,
        };
    }

} 