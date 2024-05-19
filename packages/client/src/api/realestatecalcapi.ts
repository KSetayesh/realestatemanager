import { 
    CreateRentCastApiRequest,
    CreateListingDetailsRequest,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO
} from "@realestatemanager/shared";
import axios from "axios";
import { CalcApi } from "./calcapi";

export class RealEstateCalcApi extends CalcApi {

    async getAllProperties(): Promise<ListingWithScenariosResponseDTO[]> {

        try {
            const response = await axios.get(this.getURL());
            return response.data;
        } catch (error) {
            const message = `Error fetching properties:, ${error}`;
            console.error(message);
            throw new Error(message);
        }

    }

    async realEstateCalculator(dataToSubmit: CreateInvestmentScenarioRequest): Promise<ListingWithScenariosResponseDTO> {

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

    async addNewProperty(dataToSubmit: CreateListingDetailsRequest): Promise<boolean> {

        try {
            await axios.post(`${this.getURL()}/addNewProperty`, dataToSubmit, {
                headers: this.getHeaders(),
            });
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            return false;
        }

        return true;
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
        return `${this.getBaseURL()}/realestatecalc`;
    }


}