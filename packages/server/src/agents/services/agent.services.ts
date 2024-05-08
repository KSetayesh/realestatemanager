import { Injectable } from "@nestjs/common";
import { AgentsDTO } from "@realestatemanager/shared";
import { Agent } from "../models/agent.model";
import { AgentManager } from "src/db/realestate/agent.db";
import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";

@Injectable()
export class AgentService {

    private agentManager: AgentManager;

    constructor() {
        this.agentManager = DatabaseManagerFactory.createAgentManager();
    }

    async getAllAgents(): Promise<AgentsDTO[]> {
        const agents: Agent[] = await this.agentManager.getAllAgents();
        return agents.map(agent => {
            return agent.toDTO()
        });
    }

    async addNewAgent(agent: AgentsDTO): Promise<void> {
        await this.agentManager.insertAgent(agent);
    }
}