import { AdditionalIncome } from "./additional.income.model";

export class LaundryServiceIncome extends AdditionalIncome {
    
    getType(): string {
        return LaundryServiceIncome.name;
    }

}