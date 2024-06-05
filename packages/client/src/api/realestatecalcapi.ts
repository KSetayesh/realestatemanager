import {
    CreateRentCastApiRequest,
    CreateListingDetailsRequest,
    CreateInvestmentScenarioRequest,
    ListingWithScenariosResponseDTO,
    CreateGetAllPropertiesRequest,
    CreateUpdatePropertyRequest,
    CreatePropertiesInBulkRequest
} from "@realestatemanager/shared";
import axios from "axios";
import { CalcApi } from "./calcapi";

export class RealEstateCalcApi extends CalcApi {

    async getAllProperties(getAllPropertiesRequest?: CreateGetAllPropertiesRequest): Promise<ListingWithScenariosResponseDTO[]> {
        console.log('getAllPropertiesRequest:', getAllPropertiesRequest);
        try {
            const response = await axios.post(this.getURL(), getAllPropertiesRequest, {
                headers: this.getHeaders(), // Use post method and include data in the body
            });
            return response.data;
        } catch (error) {
            const message = `Error fetching properties:, ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    async updateProperty(createUpdatePropertyRequest: CreateUpdatePropertyRequest): Promise<ListingWithScenariosResponseDTO> {
        try {
            const response = await axios.post(`${this.getURL()}/updateProperty`, createUpdatePropertyRequest, {
                headers: this.getHeaders(), // Use post method and include data in the body
            });
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

    async addPropertiesInBulk(dataToSubmit: CreatePropertiesInBulkRequest): Promise<number> {
        try {
            const response = await axios.post(`${this.getURL()}/addPropertiesInBulk`, dataToSubmit, {
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