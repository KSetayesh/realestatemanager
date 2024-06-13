import axios from "axios";
import { CalcApi } from "./calcapi";
import {
    AgentResponseDTO,
    CreateAgentRequest,
    CreateUpdateAgentRequest
} from "@realestatemanager/types";

export class AgentApi extends CalcApi {

    async getAllAgents(): Promise<AgentResponseDTO[]> {

        try {
            const response = await axios.get(this.getURL());
            return response.data;
        } catch (error) {
            const message = `Error sending form data to backend:", ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    async addNewAgent(dataToSubmit: CreateAgentRequest): Promise<boolean> {

        try {
            await axios.post(`${this.getURL()}/addNewAgent`, dataToSubmit, {
                headers: this.getHeaders(),
            });
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            return false;
        }

        return true;
    }

    async updateAgent(dataToSubmit: CreateUpdateAgentRequest): Promise<AgentResponseDTO> {
        try {
            const response = await axios.post(`${this.getURL()}/updateAgent`, dataToSubmit, {
                headers: this.getHeaders(), // Use post method and include data in the body
            });
            return response.data;
        } catch (error) {
            const message = `Error fetching properties:, ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    async deleteAgent(agentId: number): Promise<boolean> {
        try {
            const agentIdObj = {
                id: agentId,
            };
            const response = await axios.post(
                // Send agentId as an object
                `${this.getURL()}/deleteAgent`, agentIdObj, {
                headers: this.getHeaders(), // Include headers if needed
            });
            return response.data;
        } catch (error) {
            const message = `Error deleting agent: ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    protected getURL(): string {
        return `${this.getBaseURL()}/agents`;
    }

}