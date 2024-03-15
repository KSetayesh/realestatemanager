export enum HomeType {
    Condo = "Condo",
    SingleFamilyHome = "Single Family Home",
    TownHome = "Town Home",
    MultiFamilyHome = "Multi Family Home",
};

export enum Country {
    UnitedStates = "US",
};

export enum InterestType {
    FIXED = "Fixed",
    VARIABLE = "Variable",
};

export enum State {
    AL = "Alabama",
    AK = "Alaska",
    AZ = "Arizona",
    AR = "Arkansas",
    CA = "California",
    CO = "Colorado",
    CT = "Connecticut",
    DE = "Delaware",
    FL = "Florida",
    GA = "Georgia",
    HI = "Hawaii",
    ID = "Idaho",
    IL = "Illinois",
    IN = "Indiana",
    IA = "Iowa",
    KS = "Kansas",
    KY = "Kentucky",
    LA = "Louisiana",
    ME = "Maine",
    MD = "Maryland",
    MA = "Massachusetts",
    MI = "Michigan",
    MN = "Minnesota",
    MS = "Mississippi",
    MO = "Missouri",
    MT = "Montana",
    NE = "Nebraska",
    NV = "Nevada",
    NH = "New Hampshire",
    NJ = "New Jersey",
    NM = "New Mexico",
    NY = "New York",
    NC = "North Carolina",
    ND = "North Dakota",
    OH = "Ohio",
    OK = "Oklahoma",
    OR = "Oregon",
    PA = "Pennsylvania",
    RI = "Rhode Island",
    SC = "South Carolina",
    SD = "South Dakota",
    TN = "Tennessee",
    TX = "Texas",
    UT = "Utah",
    VT = "Vermont",
    VA = "Virginia",
    WA = "Washington",
    WV = "West Virginia",
    WI = "Wisconsin",
    WY = "Wyoming",
};

export enum InputType {
    TEXT = 'text',
    SELECT = 'select',
    NUMBER = 'number',
    RADIO = 'radio',
};

export enum ValueType {
    AMOUNT = 'Amount',
    RATE = 'Rate',
};

export enum PercentageAndAmount {
    PERCENTAGE = 'Percentage',
    AMOUNT = 'Amount',
}

export const ratingSelections: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const round = (num: number, places: number = 2): number => {
//     const multiplier = Math.pow(10, places);
//     return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
// }

const formatDollarAmount = (amount: number): string => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};

const booleanToYesNo = (value: boolean | undefined) => value ? 'Yes' : 'No';

// Function to render the cell data based on its type
export const renderCellData = (cellData: any, isDollarAmount: boolean = false, addSuffix?: string): string => {
    let toReturn = '';
    if (typeof cellData === 'boolean') {
        toReturn = booleanToYesNo(cellData);
    }
    else if (typeof cellData === 'string') {
        toReturn = cellData.toString();
    }
    else if (typeof cellData === 'number') {
        toReturn = isDollarAmount ? formatDollarAmount(cellData) : cellData.toString();
    }
    else if (Array.isArray(cellData)) {
        toReturn = cellData.join(', '); // Example: array to comma-separated string
    }
    else if (typeof cellData === 'object' && cellData !== null) {
        toReturn = JSON.stringify(cellData); // Or extract specific properties to render
    }

    return toReturn === '' ? toReturn : toReturn + (addSuffix ? addSuffix : ''); // Fallback for undefined or null

};