import { GrowthFrequency, ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";

export class MortgageCalculator extends ValueDependentTransactionCalculator {
    private loanAmount: number;
    private loanTermYears: number;
    private pmiRate?: number; // Optional PMI rate as a percentage
    private pmiDropOffRatio: number = 0.78; // Commonly 78% LTV ratio for PMI drop-off

    constructor(inititalPurchasePrice: ValueAmountInput, loanAmount: number, loanTermYears: number, pmiRate?: number) {
        super(inititalPurchasePrice, undefined, GrowthFrequency.MONTHLY);
        this.loanAmount = loanAmount;
        this.loanTermYears = loanTermYears;
        this.pmiRate = pmiRate;
    }

    getAmount(annualInterestRate: ValueRateInput): ValueAmountInput {
        const monthlyInterestRate = annualInterestRate.rate / 100 / 12;
        const totalPayments = this.loanTermYears * 12;
        const monthlyPayment = this.loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

        return {
            type: ValueType.AMOUNT,
            amount: monthlyPayment,
        };
    }

    getRate(annualInterestRate: ValueRateInput): ValueRateInput {
        return annualInterestRate;
    }

    calculateInterestForPayment(annualInterestRate: ValueRateInput, paymentNumber: number): number {
        const monthlyInterestRate = annualInterestRate.rate / 100 / 12;
        const balanceBeforePayment = this.calculateBalanceAfterPayment(annualInterestRate, paymentNumber - 1);
        return balanceBeforePayment * monthlyInterestRate;
    }

    calculatePrincipalForPayment(annualInterestRate: ValueRateInput, paymentNumber: number): number {
        const monthlyPayment = this.getAmount(annualInterestRate).amount;
        const interestForThisPayment = this.calculateInterestForPayment(annualInterestRate, paymentNumber);
        return monthlyPayment - interestForThisPayment;
    }

    calculateBalanceAfterPayment(annualInterestRate: ValueRateInput, paymentNumber: number): number {
        const monthlyInterestRate = annualInterestRate.rate / 100 / 12;
        const monthlyPayment = this.getAmount(annualInterestRate).amount;
        let balance = this.loanAmount;

        for (let i = 1; i <= paymentNumber; i++) {
            const interestForThisMonth = balance * monthlyInterestRate;
            const principalForThisMonth = monthlyPayment - interestForThisMonth;
            balance -= principalForThisMonth;
        }

        return balance;
    }

    calculatePMI(annualInterestRate: ValueRateInput, paymentNumber: number = 0): number {
        if (!this.pmiRate) {
            return 0; // No PMI rate provided, return 0
        }

        // Calculate the balance after the given payment number to see if PMI still applies
        const balanceAfterPayment = this.calculateBalanceAfterPayment(annualInterestRate, paymentNumber);
        const ltvAfterPayment = balanceAfterPayment / this.baseValue.amount;

        // If the LTV ratio is less than the drop-off ratio, PMI no longer applies
        if (ltvAfterPayment <= this.pmiDropOffRatio) {
            return 0;
        }

        const annualPMI = (this.loanAmount * (this.pmiRate / 100)) / 12; // Monthly PMI amount
        return annualPMI;
    }



}
