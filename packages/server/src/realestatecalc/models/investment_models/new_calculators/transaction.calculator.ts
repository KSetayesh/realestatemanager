import { Injectable } from "@nestjs/common";
import {
    GrowthFrequency,
    InterestType,
    ValueAmountInput,
    ValueInput,
    ValueRateInput,
    ValueType
} from "@realestatemanager/shared";
import { BaseTransaction } from "../new_new_new/financial.transaction.breakdown";

// export interface TxnCalcReq {
//     growthFrequency: GrowthFrequency;
// };

// export interface ValueDependentCalcReq extends TxnCalcReq {
//     baseValue: ValueAmountInput; // Generic name to cover both purchase price and rental amount
//     growthRate?: ValueRateInput; // Generic enough to cover appreciation or rental growth rate
// };

// export interface MortgageCalcReq extends ValueDependentCalcReq {
//     inititalPurchasePrice: ValueAmountInput,
//     downPaymentTxn: BaseTransaction,
//     loanTermYears: number,
//     interestType: InterestType,
//     pmiDropOffRatio: number,
// };

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

export enum CalculatorType {
    APPRECIATION_AND_INCOME_PROJECTIONS,
    DIRECT_VALUE,
    DYNAMIC_GROWTH,
    MONTHLY_APPRECIATION,
    RECURRING_EXPENSE,
    MORTGAGE,
};

@Injectable()
export abstract class TransactionCalculator implements TransactionCalculatorInterface {

    protected growthFrequency: GrowthFrequency;

    constructor(growthFrequency: GrowthFrequency = GrowthFrequency.YEARLY) {
        this.growthFrequency = growthFrequency;
    }

    abstract getAmount(valueInput: ValueInput, ...args: number[]): ValueAmountInput;

    abstract getRate(valueInput: ValueInput, ...args: number[]): ValueRateInput;

    abstract getCalculatorType(): CalculatorType;

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

