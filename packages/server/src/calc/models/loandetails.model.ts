import { InterestType } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

export abstract class LoanDetails<T> implements IDTOConvertible<T> {
    principal: number;
    annualInterestRate: number;
    termInYears: number;
    interestType: InterestType;

    constructor(principal: number, annualInterestRate: number, termInYears: number, interestType: InterestType) {
        this.principal = principal;
        this.annualInterestRate = annualInterestRate;
        this.termInYears = termInYears;
        this.interestType = interestType;
    }

    abstract toDTO(): T;

}