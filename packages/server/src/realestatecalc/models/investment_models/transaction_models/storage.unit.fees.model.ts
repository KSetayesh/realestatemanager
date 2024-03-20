import { AdditionalIncome } from "./additional.income.model";

export class StorageUnitFees extends AdditionalIncome {

    getType(): string {
        return StorageUnitFees.name;
    }

} 