import { Injectable } from "@nestjs/common";
import { AgentsDTO } from "@realestatemanager/shared";
import { Agent } from "../models/agent.model";
import { ListingManager } from "src/db/realestate/listing.db";

@Injectable()
export class AgentService {

    private listingManager: ListingManager;

    constructor() {
        this.listingManager = new ListingManager();
    }

    async getAllAgents(): Promise<AgentsDTO[]> {
        const agents: Agent[] = await this.listingManager.getAllAgents();
        return agents.map(agent => {
            return agent.toDTO()
        });
    }

    async addNewAgent(agent: AgentsDTO): Promise<void> {
        await this.listingManager.insertAgent(agent);
    }
}