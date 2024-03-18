import { IncomesDTO, Utility } from "@realestatemanager/shared";
import { AdditionalIncomeStreams } from "./additional.income.streams.model";
import { RentIncome } from "./rent.income.model";
import { IDTOConvertible } from "../idtoconvertible.model";

export class Incomes implements IDTOConvertible<IncomesDTO> {
    private additionalIncomeStreams: AdditionalIncomeStreams;
    private rentIncome: RentIncome;

    constructor(additionalIncomeStreams: AdditionalIncomeStreams, rentIncome: RentIncome) {
        this.additionalIncomeStreams = additionalIncomeStreams;
        this.rentIncome = rentIncome;
    }

    getTotalIncomes(): number {
        return this.additionalIncomeStreams.totalIncomes() + this.rentIncome.totalIncomes();
    }

    getRentalIncome(): number {
        return this.rentIncome.totalIncomes();
    }

    toDTO(): IncomesDTO {
        return {
            rentalIncome: Utility.round(this.rentIncome.totalIncomes()),
            additionalIncomeStreams: this.additionalIncomeStreams.toDTO(),
        }
    }

}