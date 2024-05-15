import axios from "axios";
import { CalcApi } from "./calcapi";
import { RentCastDetailsResponseDTO } from "@realestatemanager/shared";

export class RentCastApi extends CalcApi {

    async getRentCastApiDetails(): Promise<RentCastDetailsResponseDTO[]> {

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