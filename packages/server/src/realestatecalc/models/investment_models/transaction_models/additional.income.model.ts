import { Income } from "./income.model";

export abstract class AdditionalIncome extends Income {
    isAdditionalIncome(): boolean {
        return true;
    }
}