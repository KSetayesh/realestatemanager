import {
    ColumnDetail,
    InputType,
    PrimitiveType,
    RentCastDetailsResponseDTO,
    TableType
} from "@realestatemanager/types";

export const ApiKeyNameColumn: ColumnDetail = {
    title: "Api Key Name",
    accessor: "apiKeyName",
    inputType: InputType.STRING,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        value: (rentCastDetails: RentCastDetailsResponseDTO): PrimitiveType => {
            return rentCastDetails.apiKeyName;
        }
    },
};

export const CanMakeApiCallColumn: ColumnDetail = {
    title: "Can make API call",
    accessor: "canMakeApiCalls",
    inputType: InputType.STRING,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        value: (rentCastDetails: RentCastDetailsResponseDTO): PrimitiveType => {
            return rentCastDetails.canMakeApiCalls;
        }
    },
};

export const ApiCallsMadeThisMonthColumn: ColumnDetail = {
    title: "Api Calls Made this Month",
    accessor: "apiCallsThisMonth",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        value: (rentCastDetails: RentCastDetailsResponseDTO): PrimitiveType => {
            return rentCastDetails.apiCallsThisMonth;
        }
    },
};

export const RemainingNumberOfFreeApiCallsColumn: ColumnDetail = {
    title: "Remaining number of free API calls left",
    accessor: "remainingNumberOfFreeApiCalls",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        value: (rentCastDetails: RentCastDetailsResponseDTO): PrimitiveType => {
            return rentCastDetails.remainingNumberOfFreeApiCalls;
        }
    },
};

export const DaysIntoBillingPeriodColumn: ColumnDetail = {
    title: "Days into billing period",
    accessor: "daysIntoBillingPeriod",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        value: (rentCastDetails: RentCastDetailsResponseDTO): PrimitiveType => {
            return rentCastDetails.daysIntoBillingPeriod;
        }
    },
};

export const BillingPeriodColumn: ColumnDetail = {
    title: "Billing Period",
    accessor: "billingPeriod",
    inputType: InputType.NUMBER,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        value: (rentCastDetails: RentCastDetailsResponseDTO): PrimitiveType => {
            return rentCastDetails.billingPeriod;
        }
    },
};

export const MostRecentBillingDateColumn: ColumnDetail = {
    title: "Most Recent Billing Date",
    accessor: "mostRecentBillingDate",
    inputType: InputType.STRING,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        value: (rentCastDetails: RentCastDetailsResponseDTO): PrimitiveType => {
            return rentCastDetails.mostRecentBillingDate.toLocaleDateString('en-US');
        }
    },
};

export const FirstBilledOnColumn: ColumnDetail = {
    title: "First Billed On",
    accessor: "firstBilledOn",
    inputType: InputType.STRING,
    isUrl: false,
    isDollarAmount: false,
    addSuffix: "",
    showColumn: true,
    isEditable: false,
    isSortable: true,
    detailedDescription: "",
    [TableType.RENT_CAST_DETAILS_TABLE]: {
        value: (rentCastDetails: RentCastDetailsResponseDTO): PrimitiveType => {
            return rentCastDetails.firstBilledOn.toLocaleDateString('en-US');
        }
    },
};

