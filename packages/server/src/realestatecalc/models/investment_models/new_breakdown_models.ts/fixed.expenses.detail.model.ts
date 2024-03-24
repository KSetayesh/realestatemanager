import { FixedMonthlyExpensesDTO, ValueAmountInput, ValueInput, ValueRateInput, ValueType, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { Breakdown, FixedExpensesBreakdown } from "./fixed.expenses.breakdown.model";
import { Calculate } from "./calculate.model";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { FixedExpensesAmountCalculator } from "../new_calculators/dynamic.growth.calculator";
import { FixedExpensesRateCalculator } from "../new_calculators/fixed.expenses.rate.calculator";

export class FixedExpensesDetail implements Calculate, IDTOConvertible<FixedMonthlyExpensesDTO> {
    private fixedExpensesBreakdown: FixedExpensesBreakdown;
    private rentalGrowthRate: ValueRateInput;
    private inititalRentalAmount: ValueAmountInput;

    private fixedExpensesAmountCalculator: FixedExpensesAmountCalculator;
    private fixedExpensesRateCalculator: FixedExpensesRateCalculator;

    private monthlyPropertyTaxAmount = 'MonthlyPropertyTaxAmount';
    private monthlyHOAFeesAmount = 'MonthlyHOAFeesAmount';
    private monthlyHomeInsuranceAmount = 'MonthlyHomeInsuranceAmount';

    constructor(
        fixedExpensesBreakdown: FixedExpensesBreakdown,
        rentalGrowthRate: ValueRateInput,
        inititalRentalAmount: ValueAmountInput,
    ) {
        this.fixedExpensesBreakdown = fixedExpensesBreakdown;
        this.rentalGrowthRate = rentalGrowthRate;
        this.inititalRentalAmount = inititalRentalAmount;

        this.fixedExpensesAmountCalculator =
            new FixedExpensesAmountCalculator(
                this.rentalGrowthRate,
                this.inititalRentalAmount,
            );

        this.fixedExpensesRateCalculator =
            new FixedExpensesRateCalculator(this.inititalRentalAmount);
    }

    getTotalAmount(numberOfYears: number = 0): ValueAmountInput {
        const monthlyPropertyTaxAmount = this.calculateMonthlyPropertyTaxAmount(numberOfYears).amount;
        const monthlyHOAFeesAmount = this.calculateMonthlyHOAFeesAmount(numberOfYears).amount;
        const monthlyHomeInsuranceAmount = this.calculateMonthlyHomeInsuranceAmount(numberOfYears).amount;
        return {
            type: ValueType.AMOUNT,
            amount: monthlyPropertyTaxAmount + monthlyHOAFeesAmount + monthlyHomeInsuranceAmount,
        };
    }

    calculateMonthlyPropertyTaxAmount(numberOfYears: number = 0): ValueAmountInput {
        const propertyTax: Breakdown = this.fixedExpensesBreakdown.getMonthlyPropertyTaxAmount();
        return this.calculate(propertyTax, this.monthlyPropertyTaxAmount, numberOfYears);
    }

    calculateMonthlyHOAFeesAmount(numberOfYears: number = 0): ValueAmountInput {
        const hoaFees: Breakdown = this.fixedExpensesBreakdown.getMonthlyHOAFeesAmount();
        return this.calculate(hoaFees, this.monthlyHOAFeesAmount, numberOfYears);
    }

    calculateMonthlyHomeInsuranceAmount(numberOfYears: number = 0): ValueAmountInput {
        const homeInsurance: Breakdown = this.fixedExpensesBreakdown.getMonthlyHomeInsuranceAmount();
        return this.calculate(homeInsurance, this.monthlyHomeInsuranceAmount, numberOfYears);
    }

    toDTO(): FixedMonthlyExpensesDTO {
        return {
            monthlyPropertyTax: this.calculateMonthlyPropertyTaxAmount().amount,
            monthlyHomeInsuranceAmount: this.calculateMonthlyHomeInsuranceAmount().amount,
            monthlyHOAFeesAmount: this.calculateMonthlyHOAFeesAmount().amount,
        }
    }

    private calculate(
        breakdown: Breakdown,
        fixedExpense: string,
        numberOfYears: number = 0
    ): ValueAmountInput {

        const breakdownValue: ValueInput = breakdown.value;
        if (isValueAmountInput(breakdownValue)) {
            return this.fixedExpensesAmountCalculator.getAmount(
                breakdownValue,
                breakdown.growthRate.rate,
                numberOfYears,
            );
        }
        else if (isValueRateInput(breakdownValue)) {
            return this.fixedExpensesRateCalculator.getAmount(
                breakdownValue,
                breakdown.growthRate.rate,
                numberOfYears,
            );
        }
        throw new Error(`${fixedExpense} is not a Rate or an Amount`);
    }



}