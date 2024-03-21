import { InitialCostsDTO, Utility } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Breakdown } from "./breakdown.model";
import { Transaction } from "../transaction_models/transaction.model";

export class InitialCostsBreakdown implements IDTOConvertible<InitialCostsDTO>, Breakdown {

    private downPaymentAmount: Transaction;
    private legalAndProfessionalFees: Transaction;
    private initialRepairCosts: Transaction; // Can be RateTransaction or AmountTransaction
    private closingCosts: Transaction; // Can be RateTransaction or AmountTransaction
    private travelingCosts: Transaction;
    private otherExpenses: Transaction; // Can be RateTransaction or AmountTransaction

    constructor(downPaymentAmount: Transaction,
        legalAndProfessionalFees: Transaction,
        initialRepairCosts: Transaction,
        closingCosts: Transaction,
        travelingCosts: Transaction,
        otherExpenses: Transaction) {

        this.downPaymentAmount = downPaymentAmount;
        this.legalAndProfessionalFees = legalAndProfessionalFees;
        this.initialRepairCosts = initialRepairCosts;
        this.closingCosts = closingCosts;
        this.travelingCosts = travelingCosts;
        this.otherExpenses = otherExpenses;
    }

    /* 
        Don't want to pass numberOfYears into the function.
        Since there isn't any "projections" or "growth" to any initial costs
    */
    getTotalAmount(): number {
        return this.getDownPaymentAmount() +
            this.getLegalAndProfessionalFees() +
            this.getInitialRepairCosts() +
            this.getClosingCosts() +
            this.getTravelingCosts() +
            this.getOtherExpenses();
    }

    toDTO(): InitialCostsDTO {
        return {
            totalAmount: this.getTotalAmount(),
            breakdown: {
                downPaymentAmount: this.getDownPaymentAmount(),
                legalAndProfessionalFees: this.getLegalAndProfessionalFees(),
                initialRepairCosts: {
                    percentage: Utility.round(this.initialRepairCostsRate()),
                    amount: Utility.round(this.getInitialRepairCosts()),
                },
                closingCosts: {
                    percentage: Utility.round(this.getClosingCostsRate()),
                    amount: Utility.round(this.getClosingCosts()),
                },
                travelingCosts: this.getTravelingCosts(),
                otherExpenses: {
                    percentage: Utility.round(this.getOtherExpensesRate()),
                    amount: Utility.round(this.getOtherExpenses()),
                },
            },
        };
    }

    private getDownPaymentAmount(): number {
        return this.downPaymentAmount.getProjectedValue();
    }

    private getLegalAndProfessionalFees(): number {
        return this.legalAndProfessionalFees.getProjectedValue();
    }

    private getInitialRepairCosts(): number {
        return this.initialRepairCosts.getProjectedValue();
    }

    private initialRepairCostsRate(): number {
        return this.initialRepairCosts.getRate();
    }

    private getClosingCosts(): number {
        return this.closingCosts.getProjectedValue();
    }

    private getClosingCostsRate(): number {
        return this.closingCosts.getRate();
    }

    private getTravelingCosts(): number {
        return this.travelingCosts.getProjectedValue();
    }

    private getOtherExpenses(): number {
        return this.otherExpenses.getProjectedValue();
    }

    private getOtherExpensesRate(): number {
        return this.otherExpenses.getRate();
    }

}