import { FinancingTermsDTO, InterestType, Utility } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";

export class FinancingTerms implements IDTOConvertible<FinancingTermsDTO> {

    private annualInterestRate: number;
    private interestType: InterestType;
    private termInYears: number;
    private monthlyPayment?: number;
    private interestOnlyPeriod?: number;

    constructor(
        annualInterestRate: number,
        interestType: InterestType,
        termInYears: number,
        monthlyPayment: number,
        interestOnlyPeriod: number) {

        this.annualInterestRate = annualInterestRate;
        this.interestType = interestType;
        this.termInYears = termInYears;
        this.monthlyPayment = monthlyPayment;
        this.interestOnlyPeriod = interestOnlyPeriod;
    }

    getNumberOfPayments(): number {
        return this.termInYears * 12;
    }

    getMonthlyInterestRate(): number {
        return this.annualInterestRate / 12;
    }

    toDTO(): FinancingTermsDTO {
        return {
            annualInterestRate: Utility.round(this.annualInterestRate),
            interestType: this.interestType,
            termInYears: this.termInYears,
            monthlyPayment: Utility.round(this.monthlyPayment),
            interestOnlyPeriod: this.interestOnlyPeriod,
        };
    }

}