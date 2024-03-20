import axios from "axios";
import { CalcApi } from "./calcapi";
import { AgentsDTO } from "@realestatemanager/shared";

export class AgentApi extends CalcApi {

    async getAllAgents(): Promise<AgentsDTO[]> {

        try {
            const response = await axios.post(this.getURL());
            return response.data;
        } catch (error) {
            const message = `Error sending form data to backend:", ${error}`;
            console.error(message);
            throw new Error(message);
        }
    }

    async addNewAgent(dataToSubmit: AgentsDTO): Promise<boolean> {

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

    protected getURL(): string {
        return `${this.getBaseURL()}/agents`;
    }

}