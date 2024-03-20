import { Income } from "./income.model";

export class RentalIncome extends Income {

    getType(): string {
        return RentalIncome.name;
    }

    isRentalIncome(): boolean {
        return true;
    }

} 