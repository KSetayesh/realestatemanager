export class Utility {
    static round(num: number, places: number = 2): number {
        const multiplier = Math.pow(10, places);
        return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
    }

    static formatDollarAmount(amount: number): string {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }
}


