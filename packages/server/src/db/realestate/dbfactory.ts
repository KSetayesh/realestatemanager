import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';
import { AgentManager } from "./agent.db";
import { ListingManager } from "./listing.db";
import { RentCastManager } from "./rentcast.db";

export class DatabaseManagerFactory {

    private static pool: Pool = new Pool(dbConfig);

    static createAgentManager(): AgentManager {
        return new AgentManager();
    }

    static createListingManager(): ListingManager {
        return new ListingManager();
    }

    static createRentCastManager(): RentCastManager {
        return new RentCastManager();
    }

    static getDbPool(): Pool {
        return this.pool;
    }

}