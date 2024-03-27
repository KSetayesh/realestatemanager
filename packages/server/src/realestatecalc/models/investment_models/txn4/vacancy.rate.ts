import { ValueRateInput } from "@realestatemanager/shared";
import { Transaction } from "./transaction";
import { CalcHelper } from "./calc.helper";
import { RentEstimate } from "./rent.estimate";

export class VacancyRate implements Transaction {
    private vacancyRate: ValueRateInput;

    getVacancyAmount(initialRentalEstimate: RentEstimate, numberOfYears: number = 0): number {
        const futureDatedRentalAmount = initialRentalEstimate.getFutureDatedRentalAmount(numberOfYears);
        return new CalcHelper().getTransactionAmount(
            this.vacancyRate,
            futureDatedRentalAmount
        );
    }

    getVacancyRate(): number {
        return this.vacancyRate.rate;
    }

    toDTO() {

    }
}