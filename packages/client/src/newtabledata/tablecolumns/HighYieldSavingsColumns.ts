import {
    ColumnDetail,
    HighYeildSavingsResponseDTO,
    InputType,
    PrimitiveType,
    TableType
} from "@realestatemanager/types";

export const StartPrincipalColumn: ColumnDetail = {
    title: "Start Principal",
    accessor: "startPrincipal",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.startPrincipal;
        }
    },
};

export const StartBalanceColumn: ColumnDetail = {
    title: "Start Balance",
    accessor: "startBalance",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.startBalance;
        }
    },
};

export const InterestColumn: ColumnDetail = {
    title: "Interest",
    accessor: "interest",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.interest;
        }
    },
};

export const AccumulatedInterestColumn: ColumnDetail = {
    title: "Accumulated Interest",
    accessor: "accumulatedInterest",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.accumulatedInterest;
        }
    },
};

export const EndBalanceColumn: ColumnDetail = {
    title: "End Balance",
    accessor: "endBalance",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.endBalance;
        }
    },
};

export const EndPrincipalColumn: ColumnDetail = {
    title: "End Principal",
    accessor: "endPrincipal",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: true,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: false,
    detailedDescription: "",
    [TableType.HIGH_YIELD_SAVINGS_TABLE]: {
        value: (highYeildSavings: HighYeildSavingsResponseDTO): PrimitiveType => {
            return highYeildSavings.endPrincipal;
        }
    },
};
