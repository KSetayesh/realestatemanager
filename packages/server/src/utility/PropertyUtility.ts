import { promises as fs } from 'fs';
import { ValueInput, ValueType } from "@realestatemanager/types";

export class PropertyUtility {

    // /**
    // * This function writes the provided data to a JSON file at the specified filePath.
    // * The file writing operation is non-blocking, meaning the function does not wait
    // * for the file to be written before continuing with the execution of subsequent code.
    // * Instead, it initiates the write operation and immediately proceeds.
    // * The success or failure of the file write operation is logged using .then and .catch.
    // *
    // * @param {string} filePath - The path where the JSON file will be written.
    // * @param {any} data - The data to be written to the JSON file.
    // */
    // static writeResponseToJsonFileNonBlocking(filePath: string, data: any): void {
    //     console.log(`Writing data to ${filePath}`);
    //     fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    //         .then(() => {
    //             console.log('File has been saved successfully.');
    //         })
    //         .catch(err => {
    //             console.error('Failed to write to file:', err);
    //         });
    // }

    // /**
    //  * This function appends the provided data to a JSON file at the specified filePath.
    //  * The file writing operation is non-blocking, meaning the function does not wait
    //  * for the file to be written before continuing with the execution of subsequent code.
    //  * Instead, it initiates the write operation and immediately proceeds.
    //  * The success or failure of the file write operation is logged using .then and .catch.
    //  *
    //  * @param {string} filePath - The path where the JSON file will be written.
    //  * @param {any} data - The data to be appended to the JSON file.
    //  */
    // static appendResponseToJsonFileNonBlocking(filePath: string, data: any): void {
    //     console.log(`Appending data to ${filePath}`);
    //     fs.appendFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
    //         .then(() => {
    //             console.log('Data has been appended successfully.');
    //         })
    //         .catch(err => {
    //             console.error('Failed to append to file:', err);
    //         });
    // }

    // /**
    // * This function writes the provided data to a JSON file at the specified filePath.
    // * If the file exists, it will be overwritten. If the file does not exist, it will be created.
    // * The function waits for the write operation to complete before continuing execution.
    // *
    // * @param {string} filePath - The path where the JSON file will be written.
    // * @param {any} data - The data to be written to the JSON file.
    // * @returns {Promise<void>} - A promise that resolves when the write operation is complete.
    // */
    // static async writeResponseToJsonFileBlocking(filePath: string, data: any): Promise<void> {
    //     console.log(`Writing data to ${filePath}`);
    //     try {
    //         await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    //         console.log('File has been saved successfully.');
    //     } catch (err) {
    //         console.error('Failed to write to file:', err);
    //     }
    // }

    // /**
    //  * This function appends the provided data to a JSON file at the specified filePath.
    //  * If the file exists, the data will be appended. If the file does not exist, it will be created.
    //  * The function waits for the append operation to complete before continuing execution.
    //  *
    //  * @param {string} filePath - The path where the JSON file will be appended.
    //  * @param {any} data - The data to be appended to the JSON file.
    //  * @returns {Promise<void>} - A promise that resolves when the append operation is complete.
    //  */
    // static async appendResponseToJsonFileBlocking(filePath: string, data: any): Promise<void> {
    //     console.log(`Appending data to ${filePath}`);
    //     try {
    //         await fs.appendFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    //         console.log('Data has been appended successfully.');
    //     } catch (err) {
    //         console.error('Failed to append to file:', err);
    //     }
    // }


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

    // static calculateDaysPassedSinceIgnoreTime(inputDate: Date): number {

    //     // Get the current date
    //     const currentDate: Date = new Date();

    //     // Set time parts to 0 to compare dates only
    //     inputDate.setHours(0, 0, 0, 0);
    //     currentDate.setHours(0, 0, 0, 0);

    //     // Calculate the difference in milliseconds
    //     const differenceInMilliseconds: number = currentDate.getTime() - inputDate.getTime();

    //     // Convert milliseconds to days
    //     const millisecondsInDay: number = 1000 * 60 * 60 * 24;
    //     const daysPassed: number = Math.floor(differenceInMilliseconds / millisecondsInDay);

    //     return daysPassed;
    // }

    static convertSquareFeetToAcres(squareFeet: number): number {
        return squareFeet / 43560;
    }
}