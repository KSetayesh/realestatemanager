import { InterestType } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export abstract class LoanDetails<T> implements IDTOConvertible<T> {
    private principal: number;
    private annualInterestRate: number;
    private termInYears: number;
    private interestType: InterestType;

    constructor(principal: number, annualInterestRate: number, termInYears: number, interestType: InterestType) {
        this.principal = principal;
        this.annualInterestRate = annualInterestRate;
        this.termInYears = termInYears;
        this.interestType = interestType;
    }

    abstract toDTO(): T;

    protected getPrincipal(): number {
        return this.principal;
    }

    protected getAnnualInterestRate(): number {
        return this.annualInterestRate;
    }

    protected getTermInYears(): number {
        return this.termInYears;
    }

    protected getInterestType(): InterestType {
        return this.interestType;
    }

}