import { MortgageBreakdownDTO, Utility } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";
import { PMIDetails } from "./pmidetails.model";

export class MortgageBreakdown implements IDTOConvertible<MortgageBreakdownDTO>{

    private remainingLoanAmount: number;
    private monthlyMortgagePayment: number;
    private principalAmount: number;
    private interestAmount: number;
    private pmiDetails?: PMIDetails;

    constructor(remainingLoanAmount: number,
        monthlyMortgagePayment: number,
        principalAmount: number,
        interestAmount: number,
        pmiDetails?: PMIDetails) {

        this.remainingLoanAmount = remainingLoanAmount;
        this.monthlyMortgagePayment = monthlyMortgagePayment;
        this.principalAmount = principalAmount;
        this.interestAmount = interestAmount;
        this.pmiDetails = pmiDetails;
    }

    getPercentTowardsPrincipal() {
        return 100 - this.getPercentTowardsInterest();
    }

    getPercentTowardsInterest() {
        return Utility.round((this.principalAmount / this.monthlyMortgagePayment) * 100);
    }

    getMonthlyMortgagePayment(): number {
        return this.monthlyMortgagePayment;
    }

    toDTO(): MortgageBreakdownDTO {
        return {
            remainingLoanAmount: this.remainingLoanAmount,
            monthlyMortgagePayment: this.monthlyMortgagePayment,
            pmiDetails: this.pmiDetails.toDTO(),
            breakdown: {
                principalAmount: this.principalAmount,
                percentTowardsPrincipal: this.getPercentTowardsPrincipal(),
                interestAmount: this.interestAmount,
                percentTowardsInterest: this.getPercentTowardsInterest(),
            },
        };
    }

}