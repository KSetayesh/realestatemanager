import { FinancingTermsDTO, InterestType, Utility, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";

export class FinancingTerms implements IDTOConvertible<FinancingTermsDTO> {

    //   private loanAmount: number;
    private annualInterestRate: ValueRateInput;
    private interestType: InterestType;
    private termInYears: number;
    private monthlyPayment?: ValueAmountInput;
    private interestOnlyPeriod?: ValueAmountInput;

    constructor(//loanAmount: number,
        annualInterestRate: ValueRateInput,
        interestType: InterestType,
        termInYears: number,
        monthlyPayment?: ValueAmountInput,
        interestOnlyPeriod?: ValueAmountInput) {

        //  this.loanAmount = loanAmount;
        this.annualInterestRate = annualInterestRate;
        this.interestType = interestType;
        this.termInYears = termInYears;
        this.monthlyPayment = monthlyPayment;
        this.interestOnlyPeriod = interestOnlyPeriod;
    }

    getNumberOfPayments(): number {
        return this.termInYears * 12;
    }

    getAnnualInterestRate(): ValueRateInput {
        return this.annualInterestRate;
    }

    // getLoanAmount(): number {
    //     return this.loanAmount;
    // }

    toDTO(): FinancingTermsDTO {
        return {
            annualInterestRate: Utility.round(this.annualInterestRate.rate),
            interestType: this.interestType,
            termInYears: this.termInYears,
            monthlyPayment: Utility.round(this.monthlyPayment.amount),
            interestOnlyPeriod: this.interestOnlyPeriod.amount,
        };
    }

    // toDTO(): FinancingTermsDTO {
    //     return {
    //         loanAmount: this.loanAmount,
    //         annualInterestRate: this.annualInterestRate,
    //         interestType: this.interestType,
    //         termInYears: this.termInYears,
    //         monthlyPayment: this.monthlyPayment,
    //         interestOnlyPeriod: this.interestOnlyPeriod,
    //     };
    // }

} 