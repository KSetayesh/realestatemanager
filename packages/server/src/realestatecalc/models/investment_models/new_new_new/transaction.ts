import { Utility, ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { TransactionCalculator } from "../new_calculators/transaction.calculator";
import { TransactionKey, TransactionType } from "./transaction.detail";

export type TransactionDTO = {
    txnKey: TransactionKey;
    txnType: TransactionType;
    amount: number;
    cumulativeAmount: number;
    rate: number;
    projectedGrowthRate: number;
};

export class Transaction {
    private transactionKey: TransactionKey;
    private amount: ValueInput;
    private cumulativeAmount: ValueAmountInput;
    private calculator: TransactionCalculator;
    private txnType: TransactionType;
    private _canBeCumulated: boolean;
    private _canBePercetage: boolean;
    private _hasRateOfGrowth: boolean;
    private growthRate?: ValueRateInput;

    constructor(
        transactionKey: TransactionKey,
        amount: ValueInput,
        calculator: TransactionCalculator,
        txnType: TransactionType,
        canBeCumulated: boolean,
        canBePercetage: boolean,
        hasRateOfGrowth: boolean,
        growthRate?: ValueRateInput
    ) {
        this.transactionKey = transactionKey;
        this.amount = amount;
        this.calculator = calculator;
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

    toDTO(numberOfYears: number = 0): TransactionDTO {
        return {
            txnKey: this.getTransactionKey(),
            txnType: this.getTransactionType(),
            amount: Utility.round(this.getAmount(numberOfYears).amount),
            cumulativeAmount: Utility.round(this.cumulativeAmount.amount),
            rate: Utility.round(this.getRate(numberOfYears).rate),
            projectedGrowthRate: Utility.round(this.growthRate.rate),
        };
    }

}