import { promises as fs } from 'fs';
import { ValueInput, ValueType } from "@realestatemanager/shared";

export class PropertyUtility {

    /**
   * This function writes the provided data to a JSON file at the specified filePath.
   * The file writing operation is non-blocking, meaning the function does not wait
   * for the file to be written before continuing with the execution of subsequent code.
   * Instead, it initiates the write operation and immediately proceeds.
   * The success or failure of the file write operation is logged using .then and .catch.
   *
   * @param {string} filePath - The path where the JSON file will be written.
   * @param {any} data - The data to be written to the JSON file.
   */
    static writeResponseToJsonFile(filePath: string, data: any): void {
        console.log(`Writing rentcast api response to ${filePath}`);
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
            .then(() => {
                console.log('File has been saved successfully.');
            })
            .catch(err => {
                console.error('Failed to write to file:', err);
            });
    }

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