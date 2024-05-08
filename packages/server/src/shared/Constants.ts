import { InterestType, ValueInput, ValueType } from "@realestatemanager/shared"

export const getAmountFromValueInput = (input: ValueInput, baseValue?: number): number => {
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
};

export const getRateFromValueInput = (input: ValueInput, baseValue?: number): number => {
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
};

export const getInterestTypeEnumValue = (input: string): InterestType => {
    const matchingKey = Object.keys(InterestType).find(key => InterestType[key as keyof typeof InterestType] === input);
    if (matchingKey) {
        return InterestType[matchingKey as keyof typeof InterestType];
    }
    throw new Error(`${input} does not match any enum values.`);
};

export const getYear = (monthCounter: number): number => {
    return Math.floor((monthCounter - 1) / 12) + 1;
};

export const isFirstYear = (monthCounter: number): boolean => {
    return getYear(monthCounter) <= 1;
};

export const accumulateAndSum = (
    callback: (month: number) => number,
    monthCounter: number,
): number => {
    let total = 0;
    for (let month = 1; month <= monthCounter; month++) {
        total += callback(month);
    }
    return total;
};

export const calculateDaysPassedSinceIgnoreTime = (inputDate: Date): number => {

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
};

export const convertSquareFeetToAcres = (squareFeet: number): number => {
    return squareFeet / 43560;
};
