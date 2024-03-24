import { MortgageDetailsDTO, Utility, ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { FinancingTerms } from "./financing.terms.model";
import { PMIDetails } from "./pmi.details.model";
import { RecurringExpense } from "../transaction_models/financial.transaction.breakdown.model";
import { Expenses } from "../new_breakdown_models.ts/expenses.model";
import { Breakdown } from "../new_breakdown_models.ts/fixed.expenses.breakdown.model";
import { AppreciationCalculator } from "../new_calculators/monthly.appreciation.calculator";

export class MortgagePaymentCalculator {

    private mortgageCalculator: MortgageCalculator;
    private expenses: Expenses;
    private purchasePriceBreakdown: Breakdown;
    private appreciationCalulator: AppreciationCalculator;

    constructor(
        mortgageCalculator: MortgageCalculator,
        expenses: Expenses,
        purchasePriceBreakdown: Breakdown
    ) {
        this.mortgageCalculator = mortgageCalculator;
        this.expenses = expenses;
        this.purchasePriceBreakdown = purchasePriceBreakdown;
        this.appreciationCalulator = new AppreciationCalculator();
    }

    getPurchasePrice(): ValueAmountInput {
        const purchasePrice: ValueInput = this.purchasePriceBreakdown.value;
        if (isValueAmountInput(purchasePrice)) {
            return purchasePrice;
        }
    }

    getCurrentBalance(downPaymentAmount: ValueAmountInput, totalPrincipalPaid: ValueAmountInput): number {
        const currentEquity = totalPrincipalPaid.amount + downPaymentAmount.amount;
        return this.getPurchasePrice().amount - currentEquity;
    }

    calculatePaymentBreakdown(
        totalPrincipalPaid: ValueAmountInput,
        downPaymentAmount: ValueAmountInput,
        numberOfYears: number = 0) {

        if (isValueAmountInput(this.purchasePriceBreakdown.value)) {
            const homeAppreciationValue = this.appreciationCalulator.getAmount(
                this.purchasePriceBreakdown.value,
                this.purchasePriceBreakdown.growthRate.rate,
                numberOfYears
            ).amount;
            const mortgageAmount: ValueAmountInput = this.mortgageCalculator.calculateMortgagePaymentWithoutPMI();
            const currentBalance: number = this.getCurrentBalance(downPaymentAmount, totalPrincipalPaid);
            const pmiAmount: ValueAmountInput = this.mortgageCalculator.getPMIAmount(currentBalance, homeAppreciationValue);

        }



    }


}

export type MortgagePayment = {
    mortgageAmount: ValueAmountInput;
    pmiAmount: ValueAmountInput;
};

export class MortgageCalculator implements IDTOConvertible<MortgageDetailsDTO> {

    private purchasePrice: ValueAmountInput;
    private loanAmount: ValueAmountInput;
    private financingTerms: FinancingTerms;
    private pmiDetails?: PMIDetails;

    constructor(purchasePrice: ValueAmountInput,
        loanAmount: ValueAmountInput,
        financingTerms: FinancingTerms,
        pmiDetails?: PMIDetails) {

        this.purchasePrice = purchasePrice;
        this.loanAmount = loanAmount;
        this.financingTerms = financingTerms;
        this.pmiDetails = pmiDetails;
    }

    getPurchasePrice(): number {
        return this.purchasePrice.amount;
    }

    getNumberOfPayments(): number {
        return this.financingTerms.getNumberOfPayments();
    }

    calculateMortgagePaymentWithoutPMI(): ValueAmountInput {
        const monthlyInterestRate = this.getMonthlyInterestRate().rate / 100;
        const numberOfPayments = this.getNumberOfPayments();
        return {
            type: ValueType.AMOUNT,
            amount: this.loanAmount.amount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
        };
    }

    calculateMortgagePayment(
        totalPrincipalPaid: ValueAmountInput,
        downPaymentAmount: ValueAmountInput,
        appreciatedPropertyValue: ValueAmountInput = this.purchasePrice
    ): MortgagePayment {

        const mortgagePayment = this.calculateMortgagePaymentWithoutPMI();
        const currentEquity = totalPrincipalPaid.amount + downPaymentAmount.amount;
        const currentBalance = this.getPurchasePrice() - currentEquity;
        const pmiAmount = this.getPMIAmount(currentBalance, appreciatedPropertyValue.amount);
        return {
            mortgageAmount: {
                type: ValueType.AMOUNT,
                amount: mortgagePayment.amount,
            },
            pmiAmount: {
                type: ValueType.AMOUNT,
                amount: pmiAmount,
            },
        }
    }

    getAnnualInterestRate(): ValueRateInput {
        return this.financingTerms.getAnnualInterestRate();
    }

    getMonthlyInterestRate(): ValueRateInput {
        return {
            type: ValueType.RATE,
            rate: this.getAnnualInterestRate().rate / 12
        };
    }

    getPMIAmount(currentBalance: number, appreciatedPropertyValue: number): number {
        const isPMI = (currentBalance: number, appreciatedPropertyValue: number): boolean => {
            return currentBalance > (appreciatedPropertyValue * .8);
        };

        if (isPMI(currentBalance, appreciatedPropertyValue)) {
            // Assume PMI rate of 0.75% of the loan amount annually as an example
            const annualPMI = this.loanAmount.amount * (this.getPmiRate() / 100); //  0.0075;
            const monthlyPMI = annualPMI / 12;
            return monthlyPMI;
        }
        return 0;
    }

    private getPmiRate(): number {
        return this.pmiDetails.getPmiRate();
    }

    toDTO(): MortgageDetailsDTO {
        return {
            purchasePrice: this.purchasePrice.amount,
            downpayment: {
                percentage: Utility.round(this.getDownPaymentPercentage()),
                amount: Utility.round(this.getDownPaymentAmount()),
            },
            loanAmount: {
                amount: Utility.round(this.getLoanAmount()),
                percentage: Utility.round(this.getLoanPercentage()),
            },
            financingTerms: this.financingTerms.toDTO(),
            transactions: this.financialTransaction.toDTO(),
            pmiDetails: this.pmiDetails.toDTO(),
        };
    }

}