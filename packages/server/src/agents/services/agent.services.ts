import { Pool } from 'pg';
import { Injectable } from "@nestjs/common";
import { AgentsDTO } from "@realestatemanager/shared";
import { Agent } from "../models/agent.model";
import { AgentManager } from "src/db/realestate/agent.db";
import { DatabaseManagerFactory } from "src/db/realestate/dbfactory";

@Injectable()
export class AgentService {

    private agentManager: AgentManager;
    protected pool: Pool;

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
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }
}