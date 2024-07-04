export const Any: string = 'Any';

// export enum InputType {
//     TEXT = 'text',
//     SELECT = 'select',
//     NUMBER = 'number',
//     RADIO = 'radio',
//     STRING = 'string',
//     CHECKBOX = 'checkbox',
// };

// export enum DefaultTableType {
//     DEFAULT = 'DEFAULT',
// };

// export enum InvestmentBreakdownTableType {
//     STANDARD_BREAKDOWN = "STANDARD_BREAKDOWN",
//     MORTGAGE_BREAKDOWN = "MORTGAGE_BREAKDOWN",
//     EXPENSES_BREAKDOWN = "EXPENSES_BREAKDOWN",
//     INVESTMENT_BREAKDOWN = "INVESTMENT_BREAKDOWN",
// };

export enum AddPropertyType {
    SINGLE_PROPERTY_INPUT = 'SINGLE_PROPERTY_INPUT',
    BULK_UPLOAD = 'BULK_UPLOAD',
};

const formatDollarAmount = (amount: number): string => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};

const booleanToYesNo = (value: boolean | undefined) => value ? 'Yes' : 'No';

// Calculates the time spent in seconds from the given start time to now.
export const getTimeSpent = (startTime: number): number => {
    const endTime = Date.now();
    return (endTime - startTime) / 1000;
}

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