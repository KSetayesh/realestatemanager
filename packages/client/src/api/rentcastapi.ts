import axios from "axios";
import { CalcApi } from "./calcapi";
import { RentCastDetailsDTO } from "@realestatemanager/shared";

export class RentCastApi extends CalcApi {

    async getRentCastApiDetails(): Promise<RentCastDetailsDTO> {

        try {
            const response = await axios.get(`${this.getURL()}/rentCastApiCallDetails`);
            console.log("response:", response);
            return response.data;
        } catch (error) {
            const message = `Error sending form data to backend:", ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    protected getURL(): string {
        return `${this.getBaseURL()}/realestatecalc`;
    }

}