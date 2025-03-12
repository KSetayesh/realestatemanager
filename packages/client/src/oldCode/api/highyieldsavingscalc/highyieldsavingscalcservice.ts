import { HighYeildSavingsRequest, HighYeildSavingsResponseDTO } from "@realestatemanager/types";
import { HighYieldSavingsCalcApiInterface } from "./highyieldsavingscalcapiinterface";
import { HighYieldSavingsCalcApi } from "./highyeildsavingscalcapi";
import { HighYieldSavingsCalcTransformer } from "./highyieldsavingscalctransformer";

export class HighYeildSavingsCalcService implements HighYieldSavingsCalcApiInterface<HighYeildSavingsResponseDTO> {

    private api: HighYieldSavingsCalcApi;
    private transformer: HighYieldSavingsCalcTransformer;

    constructor() {
        this.api = new HighYieldSavingsCalcApi();
        this.transformer = new HighYieldSavingsCalcTransformer();
    }

    async highYieldSavingsCalculator(dataToSubmit: HighYeildSavingsRequest): Promise<HighYeildSavingsResponseDTO[]> {
        const highYeildSavingsDTO: HighYeildSavingsResponseDTO[] = await this.api.highYieldSavingsCalculator(dataToSubmit);
        return this.transformer.toClientArray(highYeildSavingsDTO); // Transform before returning
    }

}