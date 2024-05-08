export class Utility {

    static round(num: number, places: number = 2): number {
        const multiplier = Math.pow(10, places);
        return Math.round(num * multiplier) / multiplier;
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

        In this example the function below would take in (State, State.NY) and it will return "NY"
    */
    static getEnumNameFromValue(enumObj: any, enumValue: string): string | undefined {
        const keys = Object.keys(enumObj).find(key => enumObj[key] === enumValue);
        return keys;
    }
}


