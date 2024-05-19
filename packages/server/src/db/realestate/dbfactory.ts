import { Pool } from 'pg';
import dbConfig from '../../config/dbConfig';
import { AgentManager } from './dbmanager/agent.manager';
import { ListingManager } from './dbmanager/listing.manager';
import { RentCastManager } from './dbmanager/rentcast.manager';
import { AgentDAO } from './dao/agent.dao';
import { ListingDAO } from './dao/listing.dao';
import { RentCastDAO } from './dao/rentcast.dao';
import applicationConfig from 'src/config/applicationConfig';

export class DatabaseManagerFactory {

    private static pool: Pool = new Pool(dbConfig);
    private static commit: boolean = applicationConfig.commit;

    static createAgentManager(): AgentManager {
        return new AgentManager(new AgentDAO(), this.commit);
    }

    static createListingManager(): ListingManager {
        return new ListingManager(new ListingDAO(), this.commit);
    }

    static createRentCastManager(): RentCastManager {
        return new RentCastManager(new RentCastDAO(), this.commit);
    }

    static getDbPool(): Pool {
        return this.pool;
    }

}