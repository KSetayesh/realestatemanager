import { FixedMonthlyExpensesDTO, ValueAmountInput, ValueInput, ValueRateInput, ValueType } from "@realestatemanager/shared";
import { Breakdown } from "./breakdown.model";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { FixedExpensesAmountCalculator, FixedExpensesRateCalculator } from "../new_calculators/transaction.calculator";

export class FixedExpensesDetail {
    fixedExpensesBreakdown: FixedExpensesBreakdown;
    rentalGrowthRate: ValueRateInput;
    propertyAppreciationGrowthRate: ValueRateInput;
    inititalRentalAmount: ValueAmountInput;

    constructor(
        fixedExpensesBreakdown: FixedExpensesBreakdown,
        rentalGrowthRate: ValueRateInput,
        propertyAppreciationGrowthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
    ) {
        this.fixedExpensesBreakdown = fixedExpensesBreakdown;
        this.rentalGrowthRate = rentalGrowthRate;
        this.propertyAppreciationGrowthRate = propertyAppreciationGrowthRate;
        this.inititalRentalAmount = inititalRentalAmount;
    }

}

export class FixedExpensesBreakdown implements IDTOConvertible<FixedMonthlyExpensesDTO>, Breakdown {

    private monthlyPropertyTaxAmount: ValueInput;
    private monthlyHOAFeesAmount: ValueInput;
    private monthlyHomeInsuranceAmount: ValueInput;

    constructor(
        monthlyPropertyTaxAmount: ValueInput,
        monthlyHOAFeesAmount: ValueInput,
        monthlyHomeInsuranceAmount: ValueInput,
    ) {

        this.monthlyPropertyTaxAmount = monthlyPropertyTaxAmount;
        this.monthlyHOAFeesAmount = monthlyHOAFeesAmount;
        this.monthlyHomeInsuranceAmount = monthlyHomeInsuranceAmount;
    }

    calculateFixedExpenseAmount(
        rentalGrowthRate: ValueRateInput,
        growthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
        numberOfYears: number = 0): number {
        return this.getMonthlyPropertyTaxAmount(rentalGrowthRate, growthRate, inititalRentalAmount, numberOfYears) +
            this.getMonthlyHOAFeesAmount(rentalGrowthRate, growthRate, inititalRentalAmount, numberOfYears) +
            this.getMonthlyHomeInsuranceAmount(rentalGrowthRate, growthRate, inititalRentalAmount, numberOfYears);
    }

    getMonthlyPropertyTaxAmount(
        rentalGrowthRate: ValueRateInput,
        growthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
        numberOfYears: number = 0): number {

        return this.calculate(
            this.monthlyPropertyTaxAmount,
            rentalGrowthRate,
            growthRate,
            inititalRentalAmount,
            numberOfYears
        );
    }

    getMonthlyHOAFeesAmount(
        rentalGrowthRate: ValueRateInput,
        growthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
        numberOfYears: number = 0): number {

        return this.calculate(
            this.monthlyHOAFeesAmount,
            rentalGrowthRate,
            growthRate,
            inititalRentalAmount,
            numberOfYears
        );
    }

    getMonthlyHomeInsuranceAmount(
        rentalGrowthRate: ValueRateInput,
        growthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
        numberOfYears: number = 0): number {

        return this.calculate(
            this.monthlyHomeInsuranceAmount,
            rentalGrowthRate,
            growthRate,
            inititalRentalAmount,
            numberOfYears
        );
    }

    private calculate(
        valueType: ValueInput,
        rentalGrowthRate: ValueRateInput,
        growthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
        numberOfYears: number = 0): number {

        if (valueType.type === ValueType.AMOUNT) {
            const calc: FixedExpensesAmountCalculator = new FixedExpensesAmountCalculator(rentalGrowthRate, growthRate);
            return calc.getAmount(valueType, numberOfYears);
        }
        else if (valueType.type === ValueType.RATE) {
            const calc: FixedExpensesRateCalculator = new FixedExpensesRateCalculator(growthRate);
            return calc.getAmount(valueType, inititalRentalAmount.amount, numberOfYears);
        }

    }

    // toDTO(): FixedMonthlyExpensesDTO {

    //     return {
    //         monthlyPropertyTax: this.monthlyPropertyTaxAmount
    //         monthlyHomeInsuranceAmount: number;
    //         monthlyHOAFeesAmount: number;
    //     }
    // }

}