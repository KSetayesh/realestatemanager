import { Injectable } from "@nestjs/common";
import { AgentsDTO } from "@realestatemanager/shared";
import { RealEstateManager } from "src/db/realestate/realestate.db";
import { Agent } from "../models/agent.model";

@Injectable()
export class AgentService {

    private realEstateManager: RealEstateManager;

    constructor() {
        this.realEstateManager = new RealEstateManager();
    }

    async getAllAgents(): Promise<AgentsDTO[]> {
        const agents: Agent[] = await this.realEstateManager.getAllAgents();
        return agents.map(agent => {
            return agent.toDTO()
        });
    }

    async addNewAgent(agent: AgentsDTO) {
        await this.realEstateManager.insertAgent(agent);
    }
}