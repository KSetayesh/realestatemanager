import { InitialCostsBreakdownDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class InitialCostsBreakdown implements IDTOConvertible<InitialCostsBreakdownDTO> {

    private downPaymentAmount: number;
    private legalAndProfessionalFees: number;
    private initialRepairCosts: number;
    private closingCosts: number;
    private travelingCosts: number;
    private otherExpenses: number;

    constructor(downPaymentAmount: number,
        legalAndProfessionalFees: number,
        initialRepairCosts: number,
        closingCosts: number,
        travelingCosts: number,
        otherExpenses: number) {

        this.downPaymentAmount = downPaymentAmount;
        this.legalAndProfessionalFees = legalAndProfessionalFees;
        this.initialRepairCosts = initialRepairCosts;
        this.closingCosts = closingCosts;
        this.travelingCosts = travelingCosts;
        this.otherExpenses = otherExpenses;

    }

    getTotalInitialCosts(): number {
        return this.downPaymentAmount +
            this.legalAndProfessionalFees +
            this.initialRepairCosts +
            this.closingCosts +
            this.travelingCosts +
            this.otherExpenses;
    }

    toDTO(): InitialCostsBreakdownDTO {

        return {
            totalCosts: this.getTotalInitialCosts(),
            breakdown: {
                downPaymentAmount: this.downPaymentAmount,
                legalAndProfessionalFees: this.legalAndProfessionalFees,
                initialRepairCosts: this.initialRepairCosts,
                closingCosts: this.closingCosts,
                travelingCosts: this.travelingCosts,
                otherExpenses: this.otherExpenses,
            },
        };
    }
}