import { ValueInput, ValueType } from "@realestatemanager/types";

export class PropertyUtility {

    static getAmountFromValueInput(input: ValueInput, baseValue?: number): number {
        if (input.type === ValueType.AMOUNT) {
            return input.amount;
        }
        else if (input.type === ValueType.RATE) {
            if (baseValue === undefined) {
                throw new Error("Base value must be provided for rate calculations.");
            }
            return (input.rate / 100) * baseValue;
        }
        throw new Error("Invalid ValueType.");
    }

    static getRateFromValueInput(input: ValueInput, baseValue?: number): number {
        if (input.type === ValueType.RATE) {
            return input.rate;
        }
        else if (input.type === ValueType.AMOUNT) {
            if (baseValue === undefined) {
                throw new Error("Base value must be provided for rate calculations.");
            }
            return (input.amount / baseValue) * 100;
        }
        throw new Error("Invalid ValueType.");
    }

    static convertSquareFeetToAcres(squareFeet: number): number {
        return squareFeet / 43560;
    }
}