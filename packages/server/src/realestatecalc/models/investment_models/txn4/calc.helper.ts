import { ValueInput, isValueAmountInput, isValueRateInput } from "@realestatemanager/shared";

export class CalcHelper {

    getFutureDatedAmount(
        principal: number,
        growthRate: number,
        monthCounter: number = 0
    ): number {
        const rateOfGrowth = 1 + (growthRate / 100);
        return principal * (Math.pow(rateOfGrowth, monthCounter));
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