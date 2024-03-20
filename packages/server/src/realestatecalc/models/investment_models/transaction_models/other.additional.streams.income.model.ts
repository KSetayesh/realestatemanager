import { AdditionalIncome } from "./additional.income.model";

export class OtherAdditionalIncomeStreams extends AdditionalIncome {

    getType(): string {
        return OtherAdditionalIncomeStreams.name;
    }

}