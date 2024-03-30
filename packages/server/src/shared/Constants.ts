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

