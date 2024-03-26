import { GrowthFrequency, InterestType, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { ValueDependentTransactionCalculator } from "./value.dependent.transaction.calculator";
import { MortgageCalculatorInterface } from "./transaction.calculator";

export interface MortgageCalcRequst {
    loanAmount: number;
    loanTermYears: number;
    interestType: InterestType;
};

export class MortgageCalculator extends ValueDependentTransactionCalculator implements MortgageCalculatorInterface {

    private loanAmount: number;
    private loanTermYears: number;
    private interestType: InterestType;
    private pmiDropOffRatio: number = 0.78; // Commonly 78% LTV ratio for PMI drop-off

    // private pmiRate?: number; // Optional PMI rate as a percentage
    // private pmiDropOffRatio: number = 0.78; // Commonly 78% LTV ratio for PMI drop-off

    constructor(
        inititalPurchasePrice: ValueAmountInput,
        loanAmount: number,
        loanTermYears: number,
        interestType: InterestType) {

        super(inititalPurchasePrice, undefined, GrowthFrequency.MONTHLY);
        this.loanAmount = loanAmount;
        this.loanTermYears = loanTermYears;
        this.interestType = interestType;
        // this.pmiRate = pmiRate;
    }

    getAmount(annualInterestRate: ValueRateInput, ...args: number[]): ValueAmountInput {
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

    calculateBalanceAfterPayment(annualInterestRate: ValueRateInput, paymentNumber: number): ValueAmountInput {
        const monthlyInterestRate = annualInterestRate.rate / 100 / 12;
        const monthlyPayment = this.getAmount(annualInterestRate).amount;
        let balance = this.loanAmount;

        for (let i = 1; i <= paymentNumber; i++) {
            const interestForThisMonth = balance * monthlyInterestRate;
            const principalForThisMonth = monthlyPayment - interestForThisMonth;
            balance -= principalForThisMonth;
        }

        return {
            type: ValueType.AMOUNT,
            amount: balance,
        };
    }

    getPrincipalAmountForPayment(annualInterestRate: ValueRateInput, paymentNumber: number = 0): ValueAmountInput {
        const monthlyPayment = this.getAmount(annualInterestRate).amount;
        const interestForThisPayment = this.getInterestAmountForPayment(annualInterestRate, paymentNumber).amount;
        const amountTowardsPrincipal = monthlyPayment - interestForThisPayment;
        return {
            type: ValueType.AMOUNT,
            amount: amountTowardsPrincipal,
        };
    }

    getInterestAmountForPayment(annualInterestRate: ValueRateInput, paymentNumber: number = 0): ValueAmountInput {
        const monthlyInterestRate = annualInterestRate.rate / 100 / 12;
        const balanceBeforePayment = this.calculateBalanceAfterPayment(annualInterestRate, paymentNumber - 1).amount;
        return {
            type: ValueType.AMOUNT,
            amount: balanceBeforePayment * monthlyInterestRate
        };
    }

    getPercentageOfInterest(annualInterestRate: ValueRateInput, paymentNumber: number = 0): ValueRateInput {
        const amountInInterest = this.getAmount(annualInterestRate, paymentNumber).amount;
        const mortgageAmount = this.getAmount(annualInterestRate).amount;
        const percentageOfMortgage = (amountInInterest / mortgageAmount) * 100;
        return {
            type: ValueType.RATE,
            rate: percentageOfMortgage,
        };
    }

    getPercentageOfPrincipal(annualInterestRate: ValueRateInput, paymentNumber: number = 0): ValueRateInput {
        const percentageInInterest = this.getPercentageOfInterest(annualInterestRate, paymentNumber).rate;
        const principalPercentage = 100 - percentageInInterest;
        return {
            type: ValueType.RATE,
            rate: principalPercentage,
        };
    }

    getPMIAmount(pmiRate: ValueRateInput, annualInterestRate: number, paymentNumber: number = 0): ValueAmountInput {
        // if (!pmiRate.rate) {
        //     return 0; // No PMI rate provided, return 0
        // }

        const annualInterestRateValue: ValueRateInput = {
            type: ValueType.RATE,
            rate: annualInterestRate,
        };

        // Calculate the balance after the given payment number to see if PMI still applies
        const balanceAfterPayment = this.calculateBalanceAfterPayment(annualInterestRateValue, paymentNumber).amount;
        const ltvAfterPayment = balanceAfterPayment / this.baseValue.amount;

        // If the LTV ratio is less than the drop-off ratio, PMI no longer applies
        if (ltvAfterPayment <= this.pmiDropOffRatio) {
            return {
                type: ValueType.AMOUNT,
                amount: 0,
            };
        }

        const annualPMI = (this.loanAmount * (pmiRate.rate / 100)) / 12; // Monthly PMI amount
        return {
            type: ValueType.AMOUNT,
            amount: annualPMI,
        };
    }

    getPMIRate(pmiRate: ValueRateInput): ValueRateInput {
        return pmiRate;
    }

}
