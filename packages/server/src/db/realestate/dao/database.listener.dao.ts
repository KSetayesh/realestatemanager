import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { DatabaseService } from 'src/db/database.service';
import { CalculationsCacheHandler } from 'src/modules/realestatecalc/api/calculations.cache.handler';

@Injectable()
export class DatabaseListenerDAO implements OnModuleInit {
    private pool: Pool;
    private client: PoolClient | null = null;

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly cacheHandler: CalculationsCacheHandler,
    ) {
        this.pool = this.databaseService.getPool();
    }

    async onModuleInit() {
        await this.listenToListingChanges();
        await this.cacheHandler.setNewCacheIfNeeded(this.pool); 
    }

    async onModuleDestroy() {
        if (this.client) {
            await this.client.release();
            console.log('Client released');
        }
    }

    public async listenToListingChanges() {
        console.log('---Listening to database changes---');
        this.client = await this.pool.connect();

        try {
            await this.client.query('LISTEN listing_change');
            this.client.on('notification', async (msg) => {
                console.log('inside listener');
                console.log('Received notification:', msg.payload);
                const changes = JSON.parse(msg.payload);
                await this.handleListingChange(changes);
            });
        } catch (err) {
            console.error('Error setting up notification listener', err);
        }
    }

    private async handleListingChange(changes: any[]) {
        changes.forEach(change => {
            console.log(`Operation: ${change.operation}, Record ID: ${change.id}`);
            // Perform the necessary actions based on the change
        });
    }

    public async executeQueryWithNotification(query: string, params: any[]) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const res = await client.query(query, params);
            await client.query('SELECT notify_and_clear_affected_ids()');
            await client.query('COMMIT');
            return res;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
}
