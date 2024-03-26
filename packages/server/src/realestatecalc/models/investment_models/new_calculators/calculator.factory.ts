import { InterestType, ValueAmountInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { AppreciationAndIncomeProjectionCalculator } from "./appreciation.and.income.projection.calculator";
import { TransactionCalculator } from "./transaction.calculator";
import { DirectValueCalculator } from "./direct.value.calculator";
import { DynamicGrowthCalculator } from "./dynamic.growth.calculator";
import { MonthlyAppreciationCalculator } from "./monthly.appreciation.calculator";
import { RecurringExpenseProjectionCalculator } from "./recurring.expense.projection.calculator";
import { PMIDetails } from "../new_new_new/pmidetails.model";
import { MortgageCalculator } from "./mortgage.calculator";
import { Injectable } from "@nestjs/common";

export enum CalculatorTxnType {
    APPRECIATION_AND_INCOME_PROJECTIONS,
    DIRECT_VALUE,
    DYNAMIC_GROWTH,
    MONTHLY_APPRECIATION,
    RECURRING_EXPENSE,
    MORTGAGE,
};

export interface TransactionCalculatorRequest {
    initialPurchasePrice: number,
    appreciationGrowthRate: number,
    initialRentalAmount: number,
    rentalGrowthRate: number
    loanAmount: number;
    loanTermYears: number;
    interestType: InterestType;
    pmiDetails?: PMIDetails;
};

@Injectable()
export class CalculatorFactory {

    static createCalculator(
        type: CalculatorTxnType,
        txnCalcReq: TransactionCalculatorRequest): TransactionCalculator {

        const initialPurchasePriceValue: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: txnCalcReq.initialPurchasePrice
        };

        const appreciationGrowthRateValue: ValueRateInput = {
            type: ValueType.RATE,
            rate: txnCalcReq.appreciationGrowthRate
        };

        const initialRentalAmountValue: ValueAmountInput = {
            type: ValueType.AMOUNT,
            amount: txnCalcReq.initialRentalAmount,
        };

        const initialRentalRateValue: ValueRateInput = {
            type: ValueType.RATE,
            rate: txnCalcReq.rentalGrowthRate,
        };

        const loanAmount = txnCalcReq.loanAmount;
        const loanTermYears = txnCalcReq.loanTermYears;
        const interestType = txnCalcReq.interestType;

        switch (type) {
            case CalculatorTxnType.APPRECIATION_AND_INCOME_PROJECTIONS:
                return new AppreciationAndIncomeProjectionCalculator(initialPurchasePriceValue, appreciationGrowthRateValue);

            case CalculatorTxnType.DIRECT_VALUE:
                return new DirectValueCalculator(initialPurchasePriceValue);

            case CalculatorTxnType.DYNAMIC_GROWTH:
                return new DynamicGrowthCalculator(initialRentalAmountValue, initialRentalRateValue);

            case CalculatorTxnType.MONTHLY_APPRECIATION:
                return new MonthlyAppreciationCalculator();

            case CalculatorTxnType.RECURRING_EXPENSE:
                return new RecurringExpenseProjectionCalculator(initialRentalAmountValue, initialRentalRateValue);

            case CalculatorTxnType.MORTGAGE:
                return new MortgageCalculator(initialPurchasePriceValue, loanAmount, loanTermYears, interestType);

            default:
                throw new Error('Notification type not supported.');
        }
    }

}