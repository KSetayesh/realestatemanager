export enum PropertyStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
};

export enum PropertyType {
    SINGLE_FAMILY = 'Single Family',
    CONDO = 'Condo',
    TOWN_HOUSE = 'Townhouse',
    MANUFACTURED = 'Manufactured',
    MULTI_FAMILY = 'Multi-Family',
    APARTMENT = 'Apartment',
    LAND = 'Land',
};

export enum Country {
    UnitedStates = "US",
};

export enum InterestType {
    FIXED = "Fixed",
    VARIABLE = "Variable",
};

export enum AgentType {
    REAL_ESTATE_AGENT = "Real Estate Agent",
    LENDER = "Lender",
    PROPERTY_MANAGER = "Property Manager",
    CONTRACTOR = "Contractor",
};

export const Any: string = 'Any';

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
    STRING = 'string',
    CHECKBOX = 'checkbox',
};

export enum ValueType {
    AMOUNT = 'Amount',
    RATE = 'Rate',
};

export enum PercentageAndAmount {
    PERCENTAGE = 'Percentage',
    AMOUNT = 'Amount',
};

export enum ListingCreationType {
    MANUAL = 'Manual',
    RENT_CAST_API = 'Rent Cast Api',
    MATCHED_PRE_EXISTING_RENT_CAST_DATA = 'Matched Pre Existing Rent Cast Data',
};

export enum Filter {
    // all = 'All',
    gt = '>',
    lt = '<',
    eq = '=',
    gteq = '>=',
    lteq = '<=',
};

// export const ratingSelections: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const formatDollarAmount = (amount: number): string => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};

const booleanToYesNo = (value: boolean | undefined) => value ? 'Yes' : 'No';

export const getDateNDaysAgo = (daysAgo: number): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time component
    today.setDate(today.getDate() - daysAgo);
    return today.toISOString();
};

export const ensureAbsoluteUrl = (url: string): string => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return 'http://' + url;  // Defaulting to http if no protocol is specified
    }
    return url;
};

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