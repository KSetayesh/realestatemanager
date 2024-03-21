import { IncomesDTO, Utility } from "@realestatemanager/shared";
import { IDTOConvertible } from "../../idtoconvertible.model";
import { AdditionalIncomeStreamsBreakdown } from "../breakdown_models/additional.income.streams.breakdown.model";
import { RentalIncomeBreakdown } from "../breakdown_models/rental.income.breakdown.model";

export class Incomes implements IDTOConvertible<IncomesDTO> {
    private additionalIncomeStreams: AdditionalIncomeStreamsBreakdown;
    private rentIncome: RentalIncomeBreakdown;

    constructor(
        additionalIncomeStreams: AdditionalIncomeStreamsBreakdown,
        rentIncome: RentalIncomeBreakdown
    ) {
        this.additionalIncomeStreams = additionalIncomeStreams;
        this.rentIncome = rentIncome;
    }

    getTotalIncomes(numberOfYears: number = 0): number {
        return this.getAdditionalIncomeStreams(numberOfYears) + this.getRentalIncome(numberOfYears);
    }

    getAdditionalIncomeStreams(numberOfYears: number = 0): number {
        return this.additionalIncomeStreams.getTotalAmount(numberOfYears);
    }

    getRentalIncome(numberOfYears: number = 0): number {
        return this.rentIncome.getTotalAmount(numberOfYears);
    }

    toDTO(): IncomesDTO {
        return {
            rentalIncome: Utility.round(this.getRentalIncome()),
            additionalIncomeStreams: this.additionalIncomeStreams.toDTO(),
        }
    }

}