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
        return this.getAdditionalIncomeStreams() + this.getRentalIncome();
    }

    getAdditionalIncomeStreams(): number {
        return this.additionalIncomeStreams.totalIncomes();
    }

    getFutureDatedTotalIncomes(annualIncreaseRate: number = 0, numberOfYearsFromNow: number): number {
        return this.getAdditionalIncomeStreams() +
            this.getFutureDatedRentalIncome(annualIncreaseRate, numberOfYearsFromNow);
    }

    getRentalIncome(): number {
        return this.rentIncome.totalIncomes();
    }

    getFutureDatedRentalIncome(annualIncreaseRate: number = 0, numberOfYearsFromNow: number): number {
        return this.rentIncome.getFutureDatedRentalIncome(annualIncreaseRate, numberOfYearsFromNow);
    }

    toDTO(): IncomesDTO {
        return {
            rentalIncome: Utility.round(this.rentIncome.totalIncomes()),
            additionalIncomeStreams: this.additionalIncomeStreams.toDTO(),
        }
    }

}