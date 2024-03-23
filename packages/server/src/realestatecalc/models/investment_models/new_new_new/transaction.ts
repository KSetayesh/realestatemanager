import { Utility, ValueAmountInput, ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { TransactionDTO, TransactionKey, TransactionType } from "./financial.transaction.breakdown";
import { TransactionCalculator } from "../new_calculators/transaction.calculator";

export class Transaction {
    private transactionKey: TransactionKey;
    private amount: ValueInput;
    private calculator: TransactionCalculator;
    private txnType: TransactionType;
    private growthRate?: ValueRateInput;

    constructor(
        transactionKey: TransactionKey,
        amount: ValueInput,
        calculator: TransactionCalculator,
        txnType: TransactionType,
        growthRate?: ValueRateInput
    ) {
        this.transactionKey = transactionKey;
        this.amount = amount;
        this.calculator = calculator;
        this.txnType = txnType;
        this.growthRate = growthRate;
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

    toDTO(numberOfYears: number = 0): TransactionDTO {
        return {
            txnKey: this.getTransactionKey(),
            txnType: this.getTransactionType(),
            amount: Utility.round(this.getAmount(numberOfYears).amount),
            rate: Utility.round(this.getRate(numberOfYears).rate),
            projectedGrowthRate: Utility.round(this.growthRate.rate),
        };
    }

}