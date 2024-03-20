import { AdditionalIncome } from "./additional.income.model";

export class ParkingFeesIncome extends AdditionalIncome {

    getType(): string {
        return ParkingFeesIncome.name;
    }

}