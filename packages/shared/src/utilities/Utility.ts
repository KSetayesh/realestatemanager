export class Utility {
    static round(num: number, places: number = 2): number {
        const multiplier = Math.pow(10, places);
        return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
    }
}


