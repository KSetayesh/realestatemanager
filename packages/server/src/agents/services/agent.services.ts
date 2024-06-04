import { Pool } from 'pg';
import { Injectable } from "@nestjs/common";
import { AgentResponseDTO, CreateAgentRequest } from "@realestatemanager/shared";
import { Agent } from "../models/agent.model";
import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";
import { AgentManager } from 'src/db/realestate/dbmanager/agent.manager';
import { DatabaseService } from 'src/db/database.service';

@Injectable()
export class AgentService {

    // private agentManager: AgentManager;
    private pool: Pool;

    // constructor() {
    //     this.agentManager = DatabaseManagerFactory.createAgentManager();
    //     this.pool = DatabaseManagerFactory.getDbPool();
    // }

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