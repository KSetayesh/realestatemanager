import { ValueInput, ValueType } from "@realestatemanager/shared";

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

    static calculateDaysPassedSinceIgnoreTime(inputDate: Date): number {

        // Get the current date
        const currentDate: Date = new Date();

        // Set time parts to 0 to compare dates only
        inputDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds: number = currentDate.getTime() - inputDate.getTime();

        // Convert milliseconds to days
        const millisecondsInDay: number = 1000 * 60 * 60 * 24;
        const daysPassed: number = Math.floor(differenceInMilliseconds / millisecondsInDay);

        return daysPassed;
    }

    static convertSquareFeetToAcres(squareFeet: number): number {
        return squareFeet / 43560;
    }
}