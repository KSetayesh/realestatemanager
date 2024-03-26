import { Injectable } from "@nestjs/common";
import {
    GrowthFrequency,
    ValueAmountInput,
    ValueInput,
    ValueRateInput,
    ValueType
} from "@realestatemanager/shared";

export interface TransactionCalculatorInterface {
    getAmount(valueInput: ValueInput, ...args: number[]): ValueAmountInput;
    getRate(valueInput: ValueInput, ...args: number[]): ValueRateInput;
};

export interface MortgageCalculatorInterface extends TransactionCalculatorInterface {
    calculateBalanceAfterPayment(annualInterestRate: ValueRateInput, paymentNumber: number): ValueAmountInput;
    getPrincipalAmountForPayment(annualInterestRate: ValueRateInput, paymentNumber: number): ValueAmountInput;
    getInterestAmountForPayment(annualInterestRate: ValueRateInput, paymentNumber: number): ValueAmountInput;
    getPercentageOfInterest(annualInterestRate: ValueRateInput, paymentNumber: number): ValueRateInput;
    getPercentageOfPrincipal(annualInterestRate: ValueRateInput, paymentNumber: number): ValueRateInput;
    getPMIAmount(pmiRate: ValueRateInput, annualInterestRate: ValueRateInput, paymentNumber: number): ValueAmountInput;
    getPMIRate(pmiRate: ValueRateInput): ValueRateInput
    getLoanAmount(): ValueAmountInput;
};

@Injectable()
export abstract class TransactionCalculator implements TransactionCalculatorInterface {

    protected growthFrequency: GrowthFrequency;

    constructor(growthFrequency: GrowthFrequency = GrowthFrequency.YEARLY) {
        this.growthFrequency = growthFrequency;
    }

    abstract getAmount(valueInput: ValueInput, ...args: number[]): ValueAmountInput;

    abstract getRate(valueInput: ValueInput, ...args: number[]): ValueRateInput;

    protected getFutureDatedAmount(
        principal: number,
        growthRate: number,
        numberOfYears: number = 0
    ): ValueAmountInput {

        const rateOfGrowth = 1 + (growthRate / 100);
        return {
            type: ValueType.AMOUNT,
            amount: principal * (Math.pow(rateOfGrowth, numberOfYears))
        };

    }
}

