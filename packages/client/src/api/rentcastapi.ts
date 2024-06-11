import axios from "axios";
import { CalcApi } from "./calcapi";
import { CreateRentCastApiRequest, RentCastDetailsResponseDTO } from "@realestatemanager/shared";

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

    async addNewPropertyWithRentCastAPI(dataToSubmit: CreateRentCastApiRequest): Promise<boolean> {

        try {
            await axios.post(`${this.getURL()}/addNewPropertyWithRentCastAPI`, dataToSubmit, {
                headers: this.getHeaders(),
            });
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            return false;
        }

        return true;
    }

    protected getURL(): string {
        return `${this.getBaseURL()}/rentcast`;
    }

}