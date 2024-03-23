import { InitialCostsDTO, Utility, ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { Breakdown } from "./breakdown.model";
import { Transaction } from "../transaction_models/transaction.model";
import { InititalCostsAmountCalculator, InititalCostsRateCalculator } from "../new_calculators/transaction.calculator";

export class InitialCostsDetail {
    private initialCostsBreakdown: InitialCostsBreakdown;
    private purchasePrice: ValueAmountInput;

    constructor(
        initialCostsBreakdown: InitialCostsBreakdown,
        purchasePrice: ValueAmountInput,
    ) {
        this.initialCostsBreakdown = initialCostsBreakdown;
        this.purchasePrice = purchasePrice;
    }

}

export class InitialCostsBreakdown implements IDTOConvertible<InitialCostsDTO>, Breakdown {

    private downPayment: ValueInput;
    private legalAndProfessionalFees: ValueInput;
    private initialRepairCosts: ValueInput; // Can be RateTransaction or AmountTransaction
    private closingCosts: ValueInput; // Can be RateTransaction or AmountTransaction
    private travelingCosts: ValueInput;
    private otherInitialExpenses: ValueInput; // Can be RateTransaction or AmountTransaction

    constructor(downPayment: ValueInput,
        legalAndProfessionalFees: ValueInput,
        initialRepairCosts: ValueInput,
        closingCosts: ValueInput,
        travelingCosts: ValueInput,
        otherInitialExpenses: ValueInput) {

        this.downPayment = downPayment;
        this.legalAndProfessionalFees = legalAndProfessionalFees;
        this.initialRepairCosts = initialRepairCosts;
        this.closingCosts = closingCosts;
        this.travelingCosts = travelingCosts;
        this.otherInitialExpenses = otherInitialExpenses;
    }

    calculateDownPaymentAmount(purchasePrice: number): number {
        return this.calculate(this.downPayment, purchasePrice);
    }

    calculateLegalAndProfessionalFeesAmount(purchasePrice: number): number {
        return this.calculate(this.legalAndProfessionalFees, purchasePrice);
    }

    calculateInitialRepairCostsAmount(purchasePrice: number): number {
        return this.calculate(this.initialRepairCosts, purchasePrice);
    }

    calculateClosingCostsAmount(purchasePrice: number): number {
        return this.calculate(this.closingCosts, purchasePrice);
    }

    calculateTravelingCostsAmount(purchasePrice: number): number {
        return this.calculate(this.travelingCosts, purchasePrice);
    }

    calculateOtherInitialExpensesAmount(purchasePrice: number): number {
        return this.calculate(this.otherInitialExpenses, purchasePrice);
    }

    private calculate(
        valueType: ValueInput,
        purchasePrice: number,
    ): number {

        if (valueType.type === ValueType.AMOUNT) {
            const calc: InititalCostsAmountCalculator = new InititalCostsAmountCalculator();
            return calc.getAmount(valueType);
        }
        else if (valueType.type === ValueType.RATE) {
            const calc: InititalCostsRateCalculator = new InititalCostsRateCalculator();
            return calc.getAmount(valueType, purchasePrice);
        }

    }

    // toDTO(): InitialCostsDTO {
    //     return {
    //         totalAmount: this.getTotalAmount(),
    //         breakdown: {
    //             downPaymentAmount: this.getDownPaymentAmount(),
    //             legalAndProfessionalFees: this.getLegalAndProfessionalFees(),
    //             initialRepairCosts: {
    //                 percentage: Utility.round(this.initialRepairCostsRate()),
    //                 amount: Utility.round(this.getInitialRepairCosts()),
    //             },
    //             closingCosts: {
    //                 percentage: Utility.round(this.getClosingCostsRate()),
    //                 amount: Utility.round(this.getClosingCosts()),
    //             },
    //             travelingCosts: this.getTravelingCosts(),
    //             otherExpenses: {
    //                 percentage: Utility.round(this.getOtherExpensesRate()),
    //                 amount: Utility.round(this.getOtherExpenses()),
    //             },
    //         },
    //     };
    // }

    // private getDownPaymentAmount(): number {
    //     return this.downPaymentAmount.getProjectedValue();
    // }

    // private getLegalAndProfessionalFees(): number {
    //     return this.legalAndProfessionalFees.getProjectedValue();
    // }

    // private getInitialRepairCosts(): number {
    //     return this.initialRepairCosts.getProjectedValue();
    // }

    // private initialRepairCostsRate(): number {
    //     return this.initialRepairCosts.getRate();
    // }

    // private getClosingCosts(): number {
    //     return this.closingCosts.getProjectedValue();
    // }

    // private getClosingCostsRate(): number {
    //     return this.closingCosts.getRate();
    // }

    // private getTravelingCosts(): number {
    //     return this.travelingCosts.getProjectedValue();
    // }

    // private getOtherExpenses(): number {
    //     return this.otherExpenses.getProjectedValue();
    // }

    // private getOtherExpensesRate(): number {
    //     return this.otherExpenses.getRate();
    // }

}