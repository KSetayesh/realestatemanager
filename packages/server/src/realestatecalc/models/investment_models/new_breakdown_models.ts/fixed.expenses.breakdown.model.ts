import { ValueInput, ValueRateInput } from "@realestatemanager/shared";

export type Breakdown = {
    value: ValueInput,
    growthRate?: ValueRateInput,
};

export class FixedExpensesBreakdown {
    private monthlyPropertyTaxAmount: Breakdown;
    private monthlyHOAFeesAmount: Breakdown;
    private monthlyHomeInsuranceAmount: Breakdown;

    constructor(
        monthlyPropertyTaxAmount: Breakdown,
        monthlyHOAFeesAmount: Breakdown,
        monthlyHomeInsuranceAmount: Breakdown,
    ) {

        this.monthlyPropertyTaxAmount = monthlyPropertyTaxAmount;
        this.monthlyHOAFeesAmount = monthlyHOAFeesAmount;
        this.monthlyHomeInsuranceAmount = monthlyHomeInsuranceAmount;
    }

    getMonthlyPropertyTaxAmount(): Breakdown {
        return this.monthlyPropertyTaxAmount;
    }

    getMonthlyHOAFeesAmount(): Breakdown {
        return this.monthlyHOAFeesAmount;
    }

    getMonthlyHomeInsuranceAmount(): Breakdown {
        return this.monthlyHomeInsuranceAmount;
    }

}