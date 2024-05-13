import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';
import { AgentManager } from './dbmanager/agent.manager';
import { ListingManager } from './dbmanager/listing.manager';
import { RentCastManager } from './dbmanager/rentcast.manager';
import { AgentDAO } from './dao/agent.dao';
import { ListingDAO } from './dao/listing.dao';
import { RentCastDAO } from './dao/rentcast.dao';

export class DatabaseManagerFactory {

    private static pool: Pool = new Pool(dbConfig);

    static createAgentManager(): AgentManager {
        return new AgentManager(new AgentDAO());
    }

    static createListingManager(): ListingManager {
        return new ListingManager(new ListingDAO());
    }

    static createRentCastManager(): RentCastManager {
        return new RentCastManager(new RentCastDAO());
    }

    static getDbPool(): Pool {
        return this.pool;
    }

}