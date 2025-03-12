import { HighYeildSavingsResponseDTO, HighYeildSavingsRequest } from "@realestatemanager/types";
import axios from "axios";
import { CalcApi } from "../calcapi";
import { HighYieldSavingsCalcApiInterface } from "./highyieldsavingscalcapiinterface";

export class HighYieldSavingsCalcApi extends CalcApi implements HighYieldSavingsCalcApiInterface<HighYeildSavingsResponseDTO> {

    async highYieldSavingsCalculator(dataToSubmit: HighYeildSavingsRequest): Promise<HighYeildSavingsResponseDTO[]> {

        try {
            const response = await axios.post(`${this.getURL()}/calculate`, dataToSubmit, {
                headers: this.getHeaders(),
            });

            return response.data;
        } catch (error) {
            const message = `Error sending form data to backend:", ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    protected getURL(): string {
        return `${this.getBaseURL()}/highyieldsavingscalc`;
    }

}