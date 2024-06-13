import { Pool } from 'pg';
import { Injectable } from "@nestjs/common";
import {
    AgentResponseDTO,
    CreateAgentRequest,
    CreateUpdateAgentRequest
} from "@realestatemanager/types";
import { Agent } from "../models/agent.model";
import { AgentManager } from 'src/db/realestate/dbmanager/agent.manager';
import { DatabaseService } from 'src/db/database.service';
import { AgentBuilder } from '../builders/agent.builder';

@Injectable()
export class AgentService {

    private pool: Pool;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly agentManager: AgentManager
    ) {
        this.pool = this.databaseService.getPool();
    }

    async getAllAgents(): Promise<AgentResponseDTO[]> {
        const agents: Agent[] = await this.agentManager.getAllAgents(this.pool);
        return agents.map(agent => {
            return agent.toDTO()
        });
    }

    async addNewAgent(agentRequest: CreateAgentRequest): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this.agentManager.insertAgent(this.pool, this.buildAgent(agentRequest));

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    async updateAgent(createUpdateAgentRequest: CreateUpdateAgentRequest): Promise<AgentResponseDTO> {
        const agentId: number = createUpdateAgentRequest.id;

        // Fetch the listing details before update
        const agent: Agent = await this.agentManager.getAgentById(this.pool, agentId);

        const updatedAgent: Agent = (new AgentBuilder(agent, createUpdateAgentRequest)).build();

        await this.agentManager.updateAgent(this.pool, updatedAgent);

        // Fetch the updated data
        return (await this.agentManager.getAgentById(this.pool, agentId)).toDTO();

    }

    async deleteAgent(agentId: number): Promise<boolean> {
        return this.agentManager.deleteAgent(this.pool, agentId);
    }

    private buildAgent(agent: CreateAgentRequest): Agent {
        return new Agent(
            -1,
            agent.firstName,
            agent.lastName,
            agent.website,
            agent.companyName,
            agent.phoneNumber,
            agent.email,
            agent.state,
            agent.country,
            agent.agentType
        );
    }
}