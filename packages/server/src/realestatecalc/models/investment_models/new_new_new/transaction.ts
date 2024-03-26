import { Utility, ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { MortgageCalculatorInterface, TransactionCalculator } from "../new_calculators/transaction.calculator";
import { BaseTransactionDetail, TransactionKey, TransactionType } from "./transaction.detail";
import { MortgageCalculator } from "../new_calculators/mortgage.calculator";

export type TransactionDTO = {
    txnKey: TransactionKey;
    txnType: TransactionType;
    amount: number;
    cumulativeAmount: number;
    rate: number;
    projectedGrowthRate: number;
};

export class Transaction<T extends TransactionCalculator> {
    private transactionKey: TransactionKey;
    private amount: ValueInput;
    private cumulativeAmount: ValueAmountInput;
    private txnType: TransactionType;
    private calculator: T;
    private _canBeCumulated: boolean;
    private _canBePercetage: boolean;
    private _hasRateOfGrowth: boolean;
    private growthRate?: ValueRateInput;

    constructor(
        transactionKey: TransactionKey,
        amount: ValueInput,
        txnType: TransactionType,
        canBeCumulated: boolean,
        canBePercetage: boolean,
        hasRateOfGrowth: boolean,
        growthRate?: ValueRateInput
    ) {
        this.transactionKey = transactionKey;
        this.amount = amount;
        this.txnType = txnType;
        this.growthRate = growthRate;
        this._canBeCumulated = canBeCumulated;
        this._canBePercetage = canBePercetage;
        this._hasRateOfGrowth = hasRateOfGrowth;
        this.cumulativeAmount = {
            type: ValueType.AMOUNT,
            amount: 0
        };
    }

    protected getCalculator(): T {
        return this.calculator;
    }

    setTransactionCalculator(calculator: T) {
        this.calculator = calculator;
    }

    setCumulativeAmount(amount: ValueAmountInput) {
        this.cumulativeAmount.amount += amount.amount;
    }

    getTransactionKey(): TransactionKey {
        return this.transactionKey;
    }

    getTransactionType(): TransactionType {
        return this.txnType;
    }

    getAmount(numberOfYears: number = 0): ValueAmountInput {
        // The implementation of getAmount will depend on the type of calculator currently set.
        // Additional arguments can be passed if needed, based on the calculator's requirement.
        return this.calculator.getAmount(this.amount, this.growthRate.rate, numberOfYears);
    }

    getRate(numberOfYears: number = 0): ValueRateInput {
        // Similar to getAmount, getRate's behavior will depend on the current calculator strategy.
        // This can handle different calculations based on the calculator being used.
        return this.calculator.getRate(this.amount, this.growthRate.rate, numberOfYears);
    }

    getProjectedGrowthRate(): ValueRateInput {
        return this.growthRate;
    }

    canBeCumulated(): boolean {
        return this._canBeCumulated;
    }

    canBePercetage(): boolean {
        return this._canBePercetage;
    }

    hasRateOfGrowth(): boolean {
        return this._hasRateOfGrowth;
    }

    createBaseTransactionDetail(
        txnList: [],
        numberOfYears: number = 0,
    ): BaseTransactionDetail {

        const txnAmount = this.getAmount(numberOfYears).amount;
        const txnPercentage = this.getRate(numberOfYears).rate;
        const rateOfGrowth = this.getProjectedGrowthRate().rate
        let cumulativeAmount = txnAmount;
        if (txnList.length > 1) {
            const previousIndexData = txnList[txnList.length - 1];
            const previous: BaseTransactionDetail = previousIndexData[this.getTransactionType()][this.getTransactionKey()];
            cumulativeAmount += previous.cumulativeAmount ?? 0;
        }

        const transactionDetail: BaseTransactionDetail = {
            key: this.getTransactionKey(),
            type: this.getTransactionType(),
            amount: txnAmount,
            ...(this.canBePercetage() && { percentage: txnPercentage }),
            ...(this.canBeCumulated() && { cumulativeAmount: cumulativeAmount }),
            ...(this.hasRateOfGrowth() && { rateOfGrowth: rateOfGrowth }),
        };
        return transactionDetail;
    }

}

export class MortgageTransaction extends Transaction<MortgageCalculator> {

    // Use generics to restrict calculator type
    setTransactionCalculator(calculator: MortgageCalculator) {
        super.setTransactionCalculator(calculator);
    }

    calculateBalanceAfterPayment(annualInterestRate: ValueRateInput, paymentNumber: number = 0): ValueAmountInput {
        return this.getCalculator().calculateBalanceAfterPayment(annualInterestRate, paymentNumber);
    }

    getPrincipalAmountForPayment(annualInterestRate: ValueRateInput, paymentNumber: number = 0): ValueAmountInput {
        return this.getCalculator().getPrincipalAmountForPayment(annualInterestRate, paymentNumber);
    }

    getInterestAmountForPayment(annualInterestRate: ValueRateInput, paymentNumber: number = 0): ValueAmountInput {
        return this.getCalculator().getInterestAmountForPayment(annualInterestRate, paymentNumber);
    }

    getPercentageOfInterest(annualInterestRate: ValueRateInput, paymentNumber: number = 0): ValueRateInput {
        return this.getCalculator().getPercentageOfInterest(annualInterestRate, paymentNumber);
    }

    getPercentageOfPrincipal(annualInterestRate: ValueRateInput, paymentNumber: number): ValueRateInput {
        return this.getCalculator().getPercentageOfPrincipal(annualInterestRate, paymentNumber);
    }

    getPMIAmount(pmiRate: ValueRateInput, annualInterestRate: number, paymentNumber: number): ValueAmountInput {
        return this.getCalculator().getPMIAmount(pmiRate, annualInterestRate, paymentNumber);
    }

    getPMIRate(pmiRate: ValueRateInput): ValueRateInput {
        return this.getCalculator().getPMIRate(pmiRate);
    }

    createBaseTransactionDetail(
        txnList: [],
        numberOfYears: number = 0,
    ): BaseTransactionDetail {
        return {
            key: undefined,
            type: undefined,
            amount: 0,
        };
    }


}