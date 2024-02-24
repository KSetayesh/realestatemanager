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

export const getInterestTypeEnumValue = (inputStr: string): InterestType | undefined => {
    if (inputStr in InterestType) {
        return InterestType[inputStr as keyof typeof InterestType];
    }
    throw new Error("Input string does not match any enum values.");
};
