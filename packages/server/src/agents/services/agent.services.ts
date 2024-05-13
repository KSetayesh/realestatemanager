import { Pool } from 'pg';
import { Injectable } from "@nestjs/common";
import { AgentsDTO } from "@realestatemanager/shared";
import { Agent } from "../models/agent.model";
import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";
import { AgentManager } from 'src/db/realestate/dbmanager/agent.manager';

@Injectable()
export class AgentService {

    private agentManager: AgentManager;
    private pool: Pool;

    constructor() {
        this.agentManager = DatabaseManagerFactory.createAgentManager();
        this.pool = DatabaseManagerFactory.getDbPool();
    }

    async getAllAgents(): Promise<AgentsDTO[]> {
        const agents: Agent[] = await this.agentManager.getAllAgents(this.pool);
        return agents.map(agent => {
            return agent.toDTO()
        });
    }

    async addNewAgent(agent: AgentsDTO): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            console.log('BEGIN QUERY');

            await this.agentManager.insertAgent(this.pool, agent);

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            client.release();
        }
    }
}