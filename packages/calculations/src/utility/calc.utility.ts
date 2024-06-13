import { InterestType } from "@realestatemanager/types";

export class CalcUtility {

    static getInterestTypeEnumValue(input: string): InterestType {
        const matchingKey = Object.keys(InterestType).find(key => InterestType[key as keyof typeof InterestType] === input);
        if (matchingKey) {
            return InterestType[matchingKey as keyof typeof InterestType];
        }
        throw new Error(`${input} does not match any enum values.`);
    }

    static accumulateAndSum(
        callback: (month: number) => number,
        monthCounter: number,
    ): number {
        let total = 0;
        for (let month = 1; month <= monthCounter; month++) {
            total += callback(month);
        }
        return total;
    }

    static getYear(monthCounter: number): number {
        return Math.floor((monthCounter - 1) / 12) + 1;
    }

    static isFirstYear(monthCounter: number): boolean {
        return this.getYear(monthCounter) <= 1;
    }

}