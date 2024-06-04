import { Pool } from 'pg';
import { AgentDAO } from "../dao/agent.dao";
import { Agent } from 'src/agents/models/agent.model';
import { DatabaseManager } from './db.manager';
import { Injectable } from '@nestjs/common';

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

    async getAllAgents(pool: Pool,): Promise<Agent[]> {
        return this.agentDAO.getAllAgents(pool);
    }

}