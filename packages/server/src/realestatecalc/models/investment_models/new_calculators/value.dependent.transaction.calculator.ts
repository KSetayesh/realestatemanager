import { GrowthFrequency, ValueAmountInput, ValueInput, ValueRateInput } from "@realestatemanager/shared";
import { TransactionCalculator } from "./transaction.calculator";
import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class ValueDependentTransactionCalculator extends TransactionCalculator {

    protected baseValue: ValueAmountInput; // Generic name to cover both purchase price and rental amount
    protected growthRate?: ValueRateInput; // Generic enough to cover appreciation or rental growth rate

    constructor(
        baseValue: ValueAmountInput,
        growthRate?: ValueRateInput,
        growthFrequncy: GrowthFrequency = GrowthFrequency.YEARLY,
    ) {
        super(growthFrequncy);
        this.baseValue = baseValue;
        this.growthRate = growthRate;
    }

}