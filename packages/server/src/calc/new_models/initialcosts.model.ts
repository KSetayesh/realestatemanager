import { InitialCostsBreakdownDTO } from "@realestatemanager/shared";
import { IDTOConvertible } from "./idtoconvertible.model";

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
        return this.toDTO().totalCosts;
    }


    toDTO(): InitialCostsBreakdownDTO {
        const downPaymentAmount = this.downPaymentAmount;
        const legalAndProfessionalFees = this.legalAndProfessionalFees;
        const initialRepairCosts = this.initialRepairCosts;
        const closingCosts = this.closingCosts;
        const travelingCosts = this.travelingCosts;
        const otherExpenses = this.otherExpenses;
        const totalCosts = downPaymentAmount + legalAndProfessionalFees + initialRepairCosts + closingCosts + travelingCosts + otherExpenses;

        return {
            totalCosts: totalCosts,
            breakdown: {
                downPaymentAmount: downPaymentAmount,
                legalAndProfessionalFees: legalAndProfessionalFees,
                initialRepairCosts: initialRepairCosts,
                closingCosts: closingCosts,
                travelingCosts: travelingCosts,
                otherExpenses: otherExpenses,
            },
        };
    }
}