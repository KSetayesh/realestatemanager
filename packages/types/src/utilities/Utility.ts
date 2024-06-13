export class Utility {

    // Returns false if string is undefined, null or length = 0, otherwise return true
    static isValidString(str?: string): boolean {
        return !!str?.length;
    }

    // Basically just pass in "Date.now()"
    static getTimeSpent(startTime: number): number {
        const endTime = Date.now();
        return (endTime - startTime) / 1000;
    }

    static round(num: number, places: number = 2): number {
        const multiplier = Math.pow(10, places);
        return Math.round(num * multiplier) / multiplier;
    }

    static isDecimal(num: number): boolean {
        return num % 1 !== 0;
    }

    static getDateNDaysAgo(daysAgo: number): string {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time component
        today.setDate(today.getDate() - daysAgo);
        return today.toISOString();
    }

    static getNumberOfDaysSince(dateInPast: Date): number {
        // Create a new date object for the current date with time set to 00:00:00
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Clone dateListed and set its time to 00:00:00
        dateInPast = new Date(dateInPast.getTime());
        dateInPast.setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds between the two dates
        const timeDiff = currentDate.getTime() - dateInPast.getTime();

        // Convert the time difference to days
        const numberOfDaysSince = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;

        return numberOfDaysSince;
    }

    /*
        enum State {
            NY = 'New York'
        };

        In this example the function below would take in (State, State.NY) and it will return "NY" as a string
    */
    static getEnumNameFromValue<T extends object>(enumObj: T, enumValue: T[keyof T]): keyof T | undefined {
        const keys = Object.keys(enumObj) as Array<keyof T>;
        return keys.find(key => enumObj[key] === enumValue);
    }

    /*
        enum State {
            NY = 'New York'
        };

        In this example the function below would take in (State, "NY") and it will return "New York" as a string
    */
    static getEnumValue<T extends object>(enumType: T, enumKey: string): T[keyof T] | undefined {
        const key = enumKey as keyof T;
        return enumType[key];
    }

    static deepEqual(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) {
            return true;
        }
        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
            return false;
        }

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (!keys2.includes(key) || !Utility.deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }
}


