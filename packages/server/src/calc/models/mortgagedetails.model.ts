import { InterestType, MortgageDetailsDTO } from "@realestatemanager/shared";

export class MortgageDetails {
    principal: number;
    annualInterestRate: number;
    termInYears: number;
    interestType: InterestType;
    downPaymentPercentage: number;
    pmiRate: number;
    closingCosts?: number;

    constructor() { }

    toDTO(): MortgageDetailsDTO {
        return {
            principal: this.principal,
            annualInterestRate: this.annualInterestRate,
            termInYears: this.termInYears,
            interestType: this.interestType,
            downPaymentPercentage: this.downPaymentPercentage,
            pmiRate: this.pmiRate,
            closingCosts: this.closingCosts,
        };
    }
}