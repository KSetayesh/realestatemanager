import { InterestType, MortgageDetailsDTO } from "@realestatemanager/shared";
import { LoanDetails } from "./loandetails.model";

export class MortgageDetails extends LoanDetails<MortgageDetailsDTO> {
    private downPaymentPercentage: number;
    private pmiRate: number;
    private closingCosts?: number;

    constructor(
        principal: number,
        annualInterestRate: number,
        termInYears: number,
        interestType: InterestType,
        downPaymentPercentage: number,
        pmiRate: number,
        closingCosts?: number
    ) {
        super(principal, annualInterestRate, termInYears, interestType);
        this.downPaymentPercentage = downPaymentPercentage;
        this.pmiRate = pmiRate;
        this.closingCosts = closingCosts;
    }

    toDTO(): MortgageDetailsDTO {
        return {
            principal: this.getPrincipal(),
            annualInterestRate: this.getAnnualInterestRate(),
            termInYears: this.getTermInYears(),
            interestType: this.getInterestType(),
            downPaymentPercentage: this.downPaymentPercentage,
            pmiRate: this.pmiRate,
            closingCosts: this.closingCosts,
        };
    }
}
