export function isNumeric(value: string): boolean {
    return !isNaN(Number(value));
}

export function isInteger(value: string): boolean {
    return isNumeric(value) && Number.isInteger(value);
}

export function isBoolean(value: string): boolean {
    return value.toLocaleLowerCase() === 'true' || value.toLocaleLowerCase() === 'false';
}