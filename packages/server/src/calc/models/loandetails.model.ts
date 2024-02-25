import { InterestType } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export abstract class LoanDetails<T> implements IDTOConvertible<T> {
    private loanAmount: number;
    private annualInterestRate: number;
    private termInYears: number;
    private interestType: InterestType;

    constructor(loanAmount: number,
        annualInterestRate: number,
        termInYears: number,
        interestType: InterestType) {

        this.loanAmount = loanAmount;
        this.annualInterestRate = annualInterestRate;
        this.termInYears = termInYears;
        this.interestType = interestType;
    }

    abstract toDTO(): T;

    getLoanAmount(): number {
        return this.loanAmount;
    }

    getAnnualInterestRate(): number {
        return this.annualInterestRate;
    }

    getMonthlyInterestRate(): number {
        return this.getAnnualInterestRate() / 12;
    }

    getTermInYears(): number {
        return this.termInYears;
    }

    getNumberOfPayments(): number {
        return this.getTermInYears() * 12;
    }

    getInterestType(): InterestType {
        return this.interestType;
    }

}