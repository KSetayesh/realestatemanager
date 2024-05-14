import { Pool } from 'pg';
import { Agent } from "src/agents/models/agent.model";
import { RealEstateDAO } from "./realestate.dao";
import { AgentType, AgentsDTO, Country, State } from "@realestatemanager/shared";

export class AgentDAO extends RealEstateDAO {

    private GET_AGENTS_QUERY = `SELECT
        first_name, last_name, website, company_name, phone_number, email, state, country, agent_type 
        FROM agent
    `;

    private INSERT_AGENT_QUERY = `INSERT INTO agent
            (first_name,
            last_name,
            website,
            company_name,
            phone_number,
            email,
            state,
            country,
            agent_type)
    `;

    async insertAgent(pool: Pool, agent: AgentsDTO): Promise<void> {
        try {
            const values: any[] = [
                agent.firstName,
                agent.lastName,
                agent.website,
                agent.companyName,
                agent.phoneNumber,
                agent.email,
                agent.state,
                agent.country,
                agent.agentType
            ];

            await this.genericInsertQuery(pool, this.INSERT_AGENT_QUERY, values);

            console.log('Listing information inserted successfully');
        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    async getAllAgents(pool: Pool): Promise<Agent[]> {
        const agents: Agent[] = [];
        const query = `${this.GET_AGENTS_QUERY};`;

        try {
            const res = await pool.query(query);
            res.rows.forEach(row => {
                const agent: Agent = this.mapRowToAgent(row);
                agents.push(agent);
            });
            return agents;
        } catch (err) {
            console.error('Error fetching all agents', err);
            throw err;
        }
    }

    private mapRowToAgent(row: any): Agent {
        const firstName: string = row.first_name;
        const lastName: string = row.last_name;
        const website: string = row.website;
        const companyName: string = row.company_name;
        const phoneNumber: string = row.phone_number;
        const email: string = row.email;
        const state: State = row.state;
        const country: Country = row.country;
        const agentType: AgentType = row.agent_type;

        return new Agent(firstName, lastName, website, companyName, phoneNumber, email, state, country, agentType);
    }

}