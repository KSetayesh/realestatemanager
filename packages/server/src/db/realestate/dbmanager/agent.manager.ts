import { Pool } from 'pg';
import { AgentDAO } from "../dao/agent.dao";
import { DatabaseManager } from './db.manager';
import { Injectable } from '@nestjs/common';
import { Agent } from 'src/modules/agents/models/agent.model';
import { AgentDAOInterface } from '../dao/agent.dao.interface';

@Injectable()
export class AgentManager extends DatabaseManager implements AgentDAOInterface {

    constructor(
        private readonly agentDAO: AgentDAO,
        commit: boolean,
    ) {
        super(commit)
    }

    async insertAgent(pool: Pool, agent: Agent): Promise<void> {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        this.agentDAO.insertAgent(pool, agent);
    }

    async getAllAgents(pool: Pool): Promise<Agent[]> {
        return this.agentDAO.getAllAgents(pool);
    }

    async updateAgent(pool: Pool, agent: Agent): Promise<void> {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        await this.agentDAO.updateAgent(pool, agent);
    }

    async deleteAgent(pool: Pool, agentId: number): Promise<boolean> {
        if (!this.commit) {
            console.log(this.commitMessage);
            return;
        }
        return this.agentDAO.deleteAgent(pool, agentId);
    }

    async getAgentById(pool: Pool, id: number): Promise<Agent | null> {
        return this.agentDAO.getAgentById(pool, id);
    }

}