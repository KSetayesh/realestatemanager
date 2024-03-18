import { InvestmentScenarioRequest, ListingDetailsDTO, ListingWithScenariosDTO } from "@realestatemanager/shared";
import axios from "axios";

export class RealEstateCalcApi {

    private baseURL = 'http://localhost:3000/realestatecalc';
    private headers = { 'Content-Type': 'application/json' };

    async getAllProperties(): Promise<ListingWithScenariosDTO[]> {

        try {
            const response = await axios.get(this.baseURL);
            return response.data; 
        } catch (error) {
            const message = `Error fetching properties:, ${error}`;
            console.error(message);
            throw new Error(message);
        } 

    }

    async realEstateCalculator(dataToSubmit: InvestmentScenarioRequest): Promise<ListingWithScenariosDTO> {

        try {
            const response = await axios.post(`${this.baseURL}/calculate`, dataToSubmit, {
                headers: this.headers,
            });

            return response.data;
        } catch (error) {
            const message = `Error sending form data to backend:", ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    async addNewProperty(dataToSubmit: ListingDetailsDTO): Promise<boolean> {

        try {
            await axios.post(`${this.baseURL}/addNewProperty`, dataToSubmit, {
                headers: this.headers,
            });
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            return false;
        }

        return true;
    }


}