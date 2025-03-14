import { Pool } from 'pg';
import { RealEstateDAO } from "./realestate.dao";
import {
    AgentType,
    Country,
    State
} from "@realestatemanager/types";
import { Injectable } from '@nestjs/common';
import { Agent } from 'src/modules/agents/models/agent.model';
import { AgentDAOInterface } from './agent.dao.interface';

@Injectable()
export class AgentDAO extends RealEstateDAO implements AgentDAOInterface {

    private GET_AGENTS_QUERY = `SELECT
        id AS agent_id, first_name, last_name, website, company_name, phone_number, email, state, country, agent_type 
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

    private UPDATE_AGENT_QUERY = `UPDATE agent 
            SET first_name = $1,
                last_name = $2,
                website = $3,
                company_name = $4,
                phone_number = $5,
                email = $6,
                updated_at = $7
            WHERE id = $8;`;

    private DELETE_AGENT_QUERY = `DELETE FROM agent WHERE id = $1;`

    async insertAgent(pool: Pool, agent: Agent): Promise<void> {
        await this._insertAgent(pool, agent);
    }

    async updateAgent(pool: Pool, agent: Agent): Promise<void> {
        await this._updateAgent(pool, agent);
    }

    async deleteAgent(pool: Pool, agentId: number): Promise<boolean> {
        return this._deleteAgent(pool, agentId);
    }

    async getAgentById(pool: Pool, agentId: number): Promise<Agent> {
        return this._getAgentById(pool, agentId);
    }

    async getAllAgents(pool: Pool): Promise<Agent[]> {
        return this._getAllAgents(pool);
    }

    private async _insertAgent(pool: Pool, agent: Agent): Promise<void> {
        try {
            const values: any[] = this.getAgentValues(agent);

            await this.genericInsertQuery(pool, this.INSERT_AGENT_QUERY, values);

            console.log('Agent information inserted successfully');
        } catch (err) {
            console.error('Error inserting listing information', err);
            throw err;
        }
    }

    private async _updateAgent(pool: Pool, agent: Agent): Promise<void> {
        const query = this.UPDATE_AGENT_QUERY;

        const values: any[] = [
            agent.firstName,
            agent.lastName,
            agent.website,
            agent.companyName,
            agent.phoneNumber,
            agent.email,
            new Date(),
            agent.id,
        ];

        try {
            await pool.query(query, values);
            console.log('Agent updated successfully');
        } catch (err) {
            console.error('Error updating Agent', err);
            throw err;
        }
    }

    private async _deleteAgent(pool: Pool, agentId: number): Promise<boolean> {
        const query = this.DELETE_AGENT_QUERY;

        const values: any[] = [agentId];

        try {
            const result = await pool.query(query, values);
            console.log(`Agent id ${agentId} successfully deleted from database`);
            return result.rowCount > 0;
        } catch (err) {
            console.error('Error deleting Agent', err);
            throw err;
        }
    }

    private async _getAgentById(pool: Pool, agentId: number): Promise<Agent> {
        const query = `${this.GET_AGENTS_QUERY} WHERE id = $1;`;
        try {
            const res = await pool.query(query, [agentId]);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                const agent: Agent = this.mapRowToAgent(row);
                return agent;
            }
            return null;
        } catch (err) {
            console.error(`Error fetching property by Agent id: ${agentId}`, err);
            throw err;
        }
    }

    private async _getAllAgents(pool: Pool): Promise<Agent[]> {
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
        const id: number = row.agent_id;
        const firstName: string = row.first_name;
        const lastName: string = row.last_name;
        const website: string = row.website;
        const companyName: string = row.company_name;
        const phoneNumber: string = row.phone_number;
        const email: string = row.email;
        const state: State = row.state;
        const country: Country = row.country;
        const agentType: AgentType = row.agent_type;

        return new Agent(
            id,
            firstName,
            lastName,
            website,
            companyName,
            phoneNumber,
            email,
            state,
            country,
            agentType
        );
    }

    private getAgentValues(agent: Agent): any[] {
        return [
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
    }

}