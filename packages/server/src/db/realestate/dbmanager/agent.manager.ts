import { Pool } from 'pg';
import { AgentDAO } from "../dao/agent.dao";
import { Agent } from 'src/agents/models/agent.model';
import { AgentsDTO } from '@realestatemanager/shared';

export class AgentManager {
    
    private agentDAO: AgentDAO;

    constructor(agentDAO: AgentDAO) {
        this.agentDAO = agentDAO;
    }


    async insertAgent(pool: Pool, agent: AgentsDTO): Promise<void> {
        this.agentDAO.insertAgent(pool, agent);
    }

    async getAllAgents(pool: Pool,): Promise<Agent[]> {
        return this.agentDAO.getAllAgents(pool);
    }

}