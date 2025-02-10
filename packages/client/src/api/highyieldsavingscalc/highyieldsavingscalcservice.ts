import { HighYeildSavings, HighYeildSavingsRequest, HighYeildSavingsResponseDTO } from "@realestatemanager/types";
import { HighYieldSavingsCalcApiInterface } from "./highyieldsavingscalcapiinterface";
import { HighYieldSavingsCalcApi } from "./highyeildsavingscalcapi";
import { HighYieldSavingsCalcTransformer } from "./highyieldsavingscalctransformer";

export class HighYeildSavingsService implements HighYieldSavingsCalcApiInterface<HighYeildSavings> {

    private api: HighYieldSavingsCalcApi;
    private transformer: HighYieldSavingsCalcTransformer;

    constructor() {
        this.api = new HighYieldSavingsCalcApi();
        this.transformer = new HighYieldSavingsCalcTransformer();
    }

    async highYieldSavingsCalculator(dataToSubmit: HighYeildSavingsRequest): Promise<HighYeildSavings[]> {
        const highYeildSavingsDTO: HighYeildSavingsResponseDTO[] = await this.api.highYieldSavingsCalculator(dataToSubmit);
        return this.transformer.toClientArray(highYeildSavingsDTO); // Transform before returning
    }

}