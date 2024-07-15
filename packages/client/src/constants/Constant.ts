export const Any: string = 'Any';

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

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
    // Define a regex pattern for U.S. phone numbers
    const pattern = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    // Test the pattern against the provided phone number
    return pattern.test(phoneNumber);
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isNonNegativeWholeNumber = (value: string, callBack?: (num: number) => boolean): boolean => {
    const num = parseInt(value, 10);
    // Check if parsed number is not NaN, is a whole number, and is greater than 0
    const isValidPostitiveNumber = !isNaN(num) && num >= 0 && num.toString() === value.trim();
    if (!callBack || !isValidPostitiveNumber) {
        return isValidPostitiveNumber;
    }
    return callBack(num);
};

export const isNonNegativeNumber = (value: string, callBack?: (num: number) => boolean): boolean => {
    const num = parseFloat(value);
    // Check if the parsed number is not NaN and is greater than 0
    const isValidPostitiveNumber = !isNaN(num) && num >= 0;
    if (!callBack || !isValidPostitiveNumber) {
        return isValidPostitiveNumber;
    }
    return callBack(num);
}