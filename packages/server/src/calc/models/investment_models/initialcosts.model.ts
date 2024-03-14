import { AmountAndPercentageDTO, InitialCostsDTO } from "@realestatemanager/shared";
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

    getInitialRepairCostsAmount(): number {
        return this.initialRepairCosts.amount;
    }

    getClosingCostsAmount(): number {
        return this.closingCosts.amount;
    }

    getOtherExpensesAmount(): number {
        return this.otherExpenses.amount;
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
                initialRepairCosts: this.initialRepairCosts,
                closingCosts: this.closingCosts,
                travelingCosts: this.travelingCosts,
                otherExpenses: this.otherExpenses,
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