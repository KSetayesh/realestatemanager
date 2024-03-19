import { HighYeildSavingsDTO, HighYeildSavingsRequest } from "@realestatemanager/shared";
import axios from "axios";
import { CalcApi } from "./calcapi";

export class HighYieldSavingsCalcApi extends CalcApi {

    async highYieldSavingsCalculator(dataToSubmit: HighYeildSavingsRequest): Promise<HighYeildSavingsDTO> {
        console.log(dataToSubmit);
        console.log("url:", `${this.getURL()}/calculate`);
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