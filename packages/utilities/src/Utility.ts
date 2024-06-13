import { promises as fs } from 'fs';

export class Utility {

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
    static writeResponseToJsonFileNonBlocking(filePath: string, data: any): void {
        console.log(`Writing data to ${filePath}`);
        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
            .then(() => {
                console.log('File has been saved successfully.');
            })
            .catch(err => {
                console.error('Failed to write to file:', err);
            });
    }

    /**
     * This function appends the provided data to a JSON file at the specified filePath.
     * The file writing operation is non-blocking, meaning the function does not wait
     * for the file to be written before continuing with the execution of subsequent code.
     * Instead, it initiates the write operation and immediately proceeds.
     * The success or failure of the file write operation is logged using .then and .catch.
     *
     * @param {string} filePath - The path where the JSON file will be written.
     * @param {any} data - The data to be appended to the JSON file.
     */
    static appendResponseToJsonFileNonBlocking(filePath: string, data: any): void {
        console.log(`Appending data to ${filePath}`);
        fs.appendFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
            .then(() => {
                console.log('Data has been appended successfully.');
            })
            .catch(err => {
                console.error('Failed to append to file:', err);
            });
    }

    /**
    * This function writes the provided data to a JSON file at the specified filePath.
    * If the file exists, it will be overwritten. If the file does not exist, it will be created.
    * The function waits for the write operation to complete before continuing execution.
    *
    * @param {string} filePath - The path where the JSON file will be written.
    * @param {any} data - The data to be written to the JSON file.
    * @returns {Promise<void>} - A promise that resolves when the write operation is complete.
    */
    static async writeResponseToJsonFileBlocking(filePath: string, data: any): Promise<void> {
        console.log(`Writing data to ${filePath}`);
        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log('File has been saved successfully.');
        } catch (err) {
            console.error('Failed to write to file:', err);
        }
    }

    /**
     * This function appends the provided data to a JSON file at the specified filePath.
     * If the file exists, the data will be appended. If the file does not exist, it will be created.
     * The function waits for the append operation to complete before continuing execution.
     *
     * @param {string} filePath - The path where the JSON file will be appended.
     * @param {any} data - The data to be appended to the JSON file.
     * @returns {Promise<void>} - A promise that resolves when the append operation is complete.
     */
    static async appendResponseToJsonFileBlocking(filePath: string, data: any): Promise<void> {
        console.log(`Appending data to ${filePath}`);
        try {
            await fs.appendFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
            console.log('Data has been appended successfully.');
        } catch (err) {
            console.error('Failed to append to file:', err);
        }
    }

    /**
     * Calculates the number of days passed since the given date, ignoring the time part.
     * 
     * @param inputDate - The date to calculate the difference from.
     * @returns The number of days passed since the input date.
     */
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

    /**
    * Checks if the given string is valid (not undefined and has a length greater than 0).
    * 
    * @param str - The string to check.
    * @returns True if the string is valid, false otherwise.
    */
    static isValidString(str?: string): boolean {
        return !!str?.length;
    }

    /**
     * Calculates the time spent in seconds from the given start time to now.
     * 
     * @param startTime - The start time in milliseconds.
     * @returns The time spent in seconds.
     */
    static getTimeSpent(startTime: number): number {
        const endTime = Date.now();
        return (endTime - startTime) / 1000;
    }

    /**
     * Rounds a number to the specified number of decimal places.
     * 
     * @param num - The number to round.
     * @param places - The number of decimal places to round to (default is 2).
     * @returns The rounded number.
     */
    static round(num: number, places: number = 2): number {
        const multiplier = Math.pow(10, places);
        return Math.round(num * multiplier) / multiplier;
    }

    /**
     * Checks if a number is a decimal (has a fractional part).
     * 
     * @param num - The number to check.
     * @returns True if the number is a decimal, false otherwise.
     */
    static isDecimal(num: number): boolean {
        return num % 1 !== 0;
    }

    /**
     * Gets the date as a string in ISO format for a given number of days ago.
     * 
     * @param daysAgo - The number of days ago from today.
     * @returns The date string in ISO format.
     */
    static getDateNDaysAgo(daysAgo: number): string {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time component
        today.setDate(today.getDate() - daysAgo);
        return today.toISOString();
    }

    /**
     * Calculates the number of days since the given past date, ignoring the time component.
     * 
     * @param dateInPast - The past date to calculate from.
     * @returns The number of days since the given date.
     */
    static getNumberOfDaysSince(dateInPast: Date): number {
        // Create a new date object for the current date with time set to 00:00:00
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Clone dateInPast and set its time to 00:00:00
        dateInPast = new Date(dateInPast.getTime());
        dateInPast.setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds between the two dates
        const timeDiff = currentDate.getTime() - dateInPast.getTime();

        // Convert the time difference to days
        const numberOfDaysSince = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

        return numberOfDaysSince;
    }


    /**
    *   enum State {
    *       NY = 'New York'
    *   };
    *
    *   In this example the function below would take in (State, State.NY) and it will return "NY" as a string
    */
    static getEnumNameFromValue<T extends object>(enumObj: T, enumValue: T[keyof T]): keyof T | undefined {
        const keys = Object.keys(enumObj) as Array<keyof T>;
        return keys.find(key => enumObj[key] === enumValue);
    }

    /** 
    *   enum State {
    *        NY = 'New York'
    *   };
    *
    *   In this example the function below would take in (State, "NY") and it will return "New York" as a string
    */
    static getEnumValue<T extends object>(enumType: T, enumKey: string): T[keyof T] | undefined {
        const key = enumKey as keyof T;
        return enumType[key];
    }

    /**
     * Compares two objects for deep equality.
     * 
     * @param obj1 - The first object to compare.
     * @param obj2 - The second object to compare.
     * @returns True if the objects are deeply equal, false otherwise.
     */
    static deepEqual(obj1: any, obj2: any): boolean {
        // Check if both objects are strictly equal
        if (obj1 === obj2) {
            return true;
        }

        // Check if either object is not an object or is null
        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
            return false;
        }

        // Get the keys of both objects
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // Check if the number of keys in both objects is different
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Recursively check each key and value in both objects
        for (const key of keys1) {
            if (!keys2.includes(key) || !Utility.deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }



}