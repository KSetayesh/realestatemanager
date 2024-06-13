import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from 'src/db/database.service';
import { PropertyTransactionService } from './realestatecalc/services/property.transaction.service';
import { DatabaseListenerDAO } from 'src/db/database.listener.dao';

@Injectable()
export class InitService implements OnModuleInit {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly databaseListener: DatabaseListenerDAO,
        private readonly propertyTransactionService: PropertyTransactionService,
        private readonly enableCacheUpdates: boolean,
    ) { }

    async onModuleInit() {
        console.log('--- Starting initialization ---');
        await this.initializeDatabase();
        if (this.enableCacheUpdates) {
            await this.initializeCache();
            await this.initializeOtherService();
        }
        console.log('--- Initialization complete ---');
    }

    private async initializeDatabase() {
        console.log('Initializing database...');
        await this.databaseService.initializeDatabase();
        console.log('Database initialized');
    }

    private async initializeCache() {
        console.log('Initializing cache...');
        await this.databaseListener.listenToListingChanges();
        console.log('Cache initialized');
    }

    private async initializeOtherService() {
        console.log('Initializing other service...');
        await this.propertyTransactionService.setupCache();
        console.log('Other service initialized');
    }
}
