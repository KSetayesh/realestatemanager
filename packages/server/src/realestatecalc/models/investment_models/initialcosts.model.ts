import { AmountAndPercentageDTO, InitialCostsDTO, Utility } from "@realestatemanager/shared";
import { IDTOConvertible } from "../idtoconvertible.model";

export class InitialCostsBreakdown implements IDTOConvertible<InitialCostsDTO> {

    private downPaymentAmount: number;
    private legalAndProfessionalFees: number;
    private initialRepairCosts: AmountAndPercentageDTO;
    private closingCosts: AmountAndPercentageDTO;
    private travelingCosts: number;
    private otherExpenses: AmountAndPercentageDTO;

    constructor(downPaymentAmount: number,
        legalAndProfessionalFees: number,
        initialRepairCosts: AmountAndPercentageDTO,
        closingCosts: AmountAndPercentageDTO,
        travelingCosts: number,
        otherExpenses: AmountAndPercentageDTO) {

        this.downPaymentAmount = downPaymentAmount;
        this.legalAndProfessionalFees = legalAndProfessionalFees;
        this.initialRepairCosts = initialRepairCosts;
        this.closingCosts = closingCosts;
        this.travelingCosts = travelingCosts;
        this.otherExpenses = otherExpenses;

    }

    private getInitialRepairCostsAmount(): number {
        return this.initialRepairCosts.amount;
    }

    private getInitialRepairCostsPercentage(): number {
        return this.initialRepairCosts.percentage;
    }

    private getClosingCostsAmount(): number {
        return this.closingCosts.amount;
    }

    private getClosingCostsPercentage(): number {
        return this.closingCosts.percentage;
    }

    private getOtherExpensesAmount(): number {
        return this.otherExpenses.amount;
    }

    private getOtherExpensesPercentage(): number {
        return this.otherExpenses.percentage;
    }

    getTotalInitialCosts(): number {
        return this.downPaymentAmount +
            this.legalAndProfessionalFees +
            this.getInitialRepairCostsAmount() +
            this.getClosingCostsAmount() +
            this.travelingCosts +
            this.getOtherExpensesAmount();
    }

    toDTO(): InitialCostsDTO {
        return {
            totalAmount: this.getTotalInitialCosts(),
            breakdown: {
                downPaymentAmount: this.downPaymentAmount,
                legalAndProfessionalFees: this.legalAndProfessionalFees,
                initialRepairCosts: {
                    percentage: Utility.round(this.getInitialRepairCostsPercentage()),
                    amount: Utility.round(this.getInitialRepairCostsAmount()),
                },
                closingCosts: {
                    percentage: Utility.round(this.getClosingCostsPercentage()),
                    amount: Utility.round(this.getClosingCostsAmount()),
                },
                travelingCosts: this.travelingCosts,
                otherExpenses: {
                    percentage: Utility.round(this.getOtherExpensesPercentage()),
                    amount: Utility.round(this.getOtherExpensesAmount()),
                },
            },
        };
    }

    // toDTO(): InitialCostsBreakdownDTO {

    //     return {
    //         totalCosts: this.getTotalInitialCosts(),
    //         breakdown: {
    //             downPaymentAmount: this.downPaymentAmount,
    //             legalAndProfessionalFees: this.legalAndProfessionalFees,
    //             initialRepairCosts: this.initialRepairCosts,
    //             closingCosts: this.closingCosts,
    //             travelingCosts: this.travelingCosts,
    //             otherExpenses: this.otherExpenses,
    //         },
    //     };
    // }
}