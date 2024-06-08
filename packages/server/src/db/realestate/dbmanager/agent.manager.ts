import { Pool } from 'pg';
import { AgentDAO } from "../dao/agent.dao";
import { DatabaseManager } from './db.manager';
import { Injectable } from '@nestjs/common';
import { Agent } from 'src/modules/agents/models/agent.model';

@Injectable()
export class AgentManager extends DatabaseManager {

    // private agentDAO: AgentDAO;

    // constructor(agentDAO: AgentDAO, commit: boolean) {
    //     super(commit);
    //     this.agentDAO = agentDAO;
    // }

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
        await this.agentDAO.updateAgent(pool, agent);
    }

    async getAgentById(pool: Pool, id: number): Promise<Agent | null> {
        return this.agentDAO.getAgentById(pool, id);
    }

}