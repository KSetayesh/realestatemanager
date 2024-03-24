import { InitialCostsDTO, ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { InitialCostsBreakdown } from "./initial.costs.breakdown.model";
import { Breakdown } from "./fixed.expenses.breakdown.model";
import { Calculate } from "./calculate.model";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { InititalCostsRateCalculator } from "../new_calculators/initital.costs.rate.calculator";
import { InititalCostsAmountCalculator } from "../new_calculators/direct.value.calculator";

export class InitialCostsDetail implements Calculate, IDTOConvertible<InitialCostsDTO> {

    private purchasePrice: ValueAmountInput;
    private initialCostsBreakdown: InitialCostsBreakdown;

    private inititalCostsRateCalculator: InititalCostsRateCalculator;
    private inititalCostsAmountCalculator: InititalCostsAmountCalculator;

    private downPayment = 'Down Payment';
    private legalAndProfessionalFees = 'Legal And Professional Fees';
    private initialRepairCosts = 'Initial Repair Costs'
    private closingCosts = 'Closing Costs';
    private travelingCosts = 'Traveling Costs';
    private otherInitialExpenses = 'Other Initial Expenses';

    constructor(
        purchasePrice: ValueAmountInput,
        initialCostsBreakdown: InitialCostsBreakdown,
    ) {
        this.purchasePrice = purchasePrice;
        this.initialCostsBreakdown = initialCostsBreakdown;
        this.inititalCostsRateCalculator = new InititalCostsRateCalculator(this.purchasePrice);
        this.inititalCostsAmountCalculator = new InititalCostsAmountCalculator(this.purchasePrice);
    }

    getTotalAmount(): ValueAmountInput {
        const downPaymentAmount = this.calculateDownPaymentAmount().amount;
        const legalAndProfessionalFees = this.calculateLegalAndProfessionalFees().amount;
        const initialRepairCosts = this.calculateInitialRepairCosts().amount;
        const closingCosts = this.calculateClosingCosts().amount;
        const travelingCosts = this.calculateTravelingCosts().amount;
        const initialExpenses = this.calculateOtherInitialExpenses().amount;
        return {
            type: ValueType.AMOUNT,
            amount: downPaymentAmount +
                legalAndProfessionalFees +
                initialRepairCosts +
                closingCosts +
                travelingCosts +
                initialExpenses,
        };
    }

    calculateDownPaymentAmount(): ValueAmountInput {
        const downPayment: Breakdown = this.initialCostsBreakdown.getDownPayment();
        return this.calculateAmount(downPayment, this.downPayment);
    }

    calculateDownPaymentPercentage(): ValueRateInput {
        const downPayment: Breakdown = this.initialCostsBreakdown.getDownPayment();
        return this.calculateRate(downPayment, this.downPayment);
    }

    calculateLegalAndProfessionalFees(): ValueAmountInput {
        const legalAndProfessionalFees: Breakdown = this.initialCostsBreakdown.getLegalAndProfessionalFees();
        return this.calculateAmount(legalAndProfessionalFees, this.legalAndProfessionalFees);
    }

    calculateInitialRepairCosts(): ValueAmountInput {
        const initialRepairCosts: Breakdown = this.initialCostsBreakdown.getInitialRepairCosts();
        return this.calculateAmount(initialRepairCosts, this.initialRepairCosts);
    }

    getInitialRepairRate(): ValueRateInput {
        const initialRepairCosts: Breakdown = this.initialCostsBreakdown.getInitialRepairCosts();
        return this.calculateRate(initialRepairCosts, this.initialRepairCosts);
    }

    calculateClosingCosts(): ValueAmountInput {
        const closingCosts: Breakdown = this.initialCostsBreakdown.getClosingCosts();
        return this.calculateAmount(closingCosts, this.closingCosts);
    }

    getClosingCostsRate(): ValueRateInput {
        const closingCosts: Breakdown = this.initialCostsBreakdown.getClosingCosts();
        return this.calculateRate(closingCosts, this.closingCosts);
    }

    calculateTravelingCosts(): ValueAmountInput {
        const travelingCosts: Breakdown = this.initialCostsBreakdown.getTravelingCosts();
        return this.calculateAmount(travelingCosts, this.travelingCosts);
    }

    calculateOtherInitialExpenses(): ValueAmountInput {
        const otherInitialExpenses: Breakdown = this.initialCostsBreakdown.getOtherInitialExpenses();
        return this.calculateAmount(otherInitialExpenses, this.otherInitialExpenses);
    }

    getOtherInitialExpensesRate(): ValueRateInput {
        const otherInitialExpenses: Breakdown = this.initialCostsBreakdown.getOtherInitialExpenses();
        return this.calculateRate(otherInitialExpenses, this.otherInitialExpenses);
    }

    toDTO(): InitialCostsDTO {
        return {
            totalAmount: this.getTotalAmount().amount,
            breakdown: {
                downPaymentAmount: this.calculateDownPaymentAmount().amount,
                legalAndProfessionalFees: this.calculateLegalAndProfessionalFees().amount,
                initialRepairCosts: {
                    amount: this.calculateInitialRepairCosts().amount,
                    percentage: this.getInitialRepairRate().rate,
                },
                closingCosts: {
                    amount: this.calculateClosingCosts().amount,
                    percentage: this.getClosingCostsRate().rate,
                },
                travelingCosts: this.calculateTravelingCosts().amount,
                otherExpenses: {
                    amount: this.calculateOtherInitialExpenses().amount,
                    percentage: this.getOtherInitialExpensesRate().rate,
                }
            }
        };
    }

    private calculateAmount(breakdown: Breakdown, initialCosts: string): ValueAmountInput {
        const breakdownValue: ValueInput = breakdown.value;
        if (isValueAmountInput(breakdownValue)) {
            return this.inititalCostsAmountCalculator.getAmount(
                breakdownValue,
            );
        }
        else if (isValueRateInput(breakdownValue)) {
            return this.inititalCostsRateCalculator.getAmount(
                breakdownValue,
            );
        }
        throw new Error(`${initialCosts} is not a Rate or an Amount`);
    }

    private calculateRate(breakdown: Breakdown, initialCosts: string): ValueRateInput {
        const breakdownValue: ValueInput = breakdown.value;
        if (isValueAmountInput(breakdownValue)) {
            return this.inititalCostsAmountCalculator.getRate(
                breakdownValue,
            );
        }
        else if (isValueRateInput(breakdownValue)) {
            return this.inititalCostsRateCalculator.getRate(
                breakdownValue,
            );
        }
        throw new Error(`${initialCosts} is not a Rate or an Amount`);
    }

}