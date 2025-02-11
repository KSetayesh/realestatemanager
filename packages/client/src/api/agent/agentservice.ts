import { AgentResponseDTO, CreateAgentRequest, CreateUpdateAgentRequest } from "@realestatemanager/types";
import { AgentApi } from "./agentapi";
import { AgentDataTransformer } from "./agentdatatransformer";
import { AgentApiInterface } from "./agentapiinterface";

export class AgentService implements AgentApiInterface<AgentResponseDTO> {

    private api: AgentApi;
    private transformer: AgentDataTransformer;

    constructor() {
        this.api = new AgentApi();
        this.transformer = new AgentDataTransformer();
    }

    async getAllAgents(): Promise<AgentResponseDTO[]> {
        const agentDTOs: AgentResponseDTO[] = await this.api.getAllAgents();
        return this.transformer.toClientArray(agentDTOs); // Transform before returning
    }

    async addNewAgent(dataToSubmit: CreateAgentRequest): Promise<boolean> {
        return this.api.addNewAgent(dataToSubmit);
    }

    async updateAgent(dataToSubmit: CreateUpdateAgentRequest): Promise<AgentResponseDTO> {
        const updatedAgentDTO: AgentResponseDTO = await this.api.updateAgent(dataToSubmit);
        return this.transformer.toClient(updatedAgentDTO);
    }

    async deleteAgent(agentId: number): Promise<boolean> {
        return this.api.deleteAgent(agentId);
    }

}