import { ValueInput, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";
import { getYear } from "src/shared/Constants";

export class CalcHelper {

    getFutureDatedAmount(
        principal: number,
        growthRate: number,
        monthCounter: number,
    ): number {
        const rateOfGrowth = 1 + (growthRate / 100);
        return principal * (Math.pow(rateOfGrowth, getYear(monthCounter)));
    }

    getTransactionAmount(valueInput: ValueInput, principalAmount: number): number {
        if (isValueAmountInput(valueInput)) {
            return valueInput.amount;
        }
        else if (isValueRateInput(valueInput)) {
            return principalAmount * (valueInput.rate / 100);
        }
    }

    getTransactionPercent(valueInput: ValueInput, principalAmount: number): number {
        if (isValueAmountInput(valueInput)) {
            return (valueInput.amount / principalAmount) * 100;
        }
        else if (isValueRateInput(valueInput)) {
            return valueInput.rate;
        }
    }

    // getYear(monthCounter: number): number {
    //     return Math.floor((monthCounter - 1) / 12) + 1;
    // }
}