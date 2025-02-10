import { HighYeildSavingsRequest } from "@realestatemanager/types";

export interface HighYieldSavingsCalcApiInterface<T> {
    highYieldSavingsCalculator(dataToSubmit: HighYeildSavingsRequest): Promise<T[]>
};