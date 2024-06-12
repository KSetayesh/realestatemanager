import { Pool } from 'pg';
import { Agent } from "src/modules/agents/models/agent.model";

export interface AgentDAOInterface {

    insertAgent(pool: Pool, agent: Agent): Promise<void>;

    updateAgent(pool: Pool, agent: Agent): Promise<void>;

    deleteAgent(pool: Pool, agentId: number): Promise<boolean>;

    getAgentById(pool: Pool, agentId: number): Promise<Agent>;

    getAllAgents(pool: Pool): Promise<Agent[]>;

}