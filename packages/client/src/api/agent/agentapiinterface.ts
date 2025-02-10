import { CreateAgentRequest, CreateUpdateAgentRequest } from "@realestatemanager/types";

export interface AgentApiInterface<T> {
    getAllAgents(): Promise<T[]>;
    addNewAgent(dataToSubmit: CreateAgentRequest): Promise<boolean>;
    updateAgent(dataToSubmit: CreateUpdateAgentRequest): Promise<T>;
    deleteAgent(agentId: number): Promise<boolean>;
};