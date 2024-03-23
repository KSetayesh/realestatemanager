import { IncomesDTO, Utility, ValueAmountInput, ValueRateInput } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { AdditionalIncomeStreamsBreakdown } from "../breakdown_models/additional.income.streams.breakdown.model";
import { RentalIncomeBreakdown } from "../breakdown_models/rental.income.breakdown.model";

export class IncomesBreakdown implements IDTOConvertible<IncomesDTO> {

    private additionalIncomeStreams: AdditionalIncomeStreamsBreakdown;
    private rentalIncome: RentalIncomeBreakdown;

    constructor(
        additionalIncomeStreams: AdditionalIncomeStreamsBreakdown,
        rentalIncome: RentalIncomeBreakdown
    ) {
        this.additionalIncomeStreams = additionalIncomeStreams;
        this.rentalIncome = rentalIncome;
    }

    getTotalIncomes(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0
    ): number {
        return this.getAdditionalIncomeStreams(incomeGrowthRate, appreciationGrowthRate, numberOfYears) +
            this.getRentalIncome(incomeGrowthRate, appreciationGrowthRate, numberOfYears);
    }

    getAdditionalIncomeStreams(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0): number {
        return this.additionalIncomeStreams.calculateAdditionalIncomes(incomeGrowthRate, appreciationGrowthRate, numberOfYears);
    }

    getRentalIncome(
        incomeGrowthRate: ValueRateInput,
        appreciationGrowthRate: ValueRateInput,
        numberOfYears: number = 0): number {
        return this.rentalIncome.calculateRentalIncome(incomeGrowthRate, appreciationGrowthRate, numberOfYears);
    }

    toDTO(): IncomesDTO {
        return {
            rentalIncome: Utility.round(this.getRentalIncome()),
            additionalIncomeStreams: this.additionalIncomeStreams.toDTO(),
        }
    }

}