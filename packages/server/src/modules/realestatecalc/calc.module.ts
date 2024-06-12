import { Module, forwardRef } from '@nestjs/common';
import { CalcController } from './controllers/calc.controller';
import { PropertyTransactionService } from './services/property.transaction.service';
import { ListingDAO } from 'src/db/realestate/dao/listing.dao';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import applicationConfig from 'src/config/applicationConfig';
import { AppModule } from '../app.module';
import { CalculationsApiClient } from './api/calculations.api.client';
import { CalculationsCacheHandler } from './api/calculations.cache.handler';
import { DatabaseListenerDAO } from 'src/db/realestate/dao/database.listener.dao';
import { PropertyService } from './services/property.service';
import { DatabaseService } from 'src/db/database.service';

@Module({
    imports: [forwardRef(() => AppModule)],  // Ensure AppModule is imported using forwardRef to avoid circular dependency
    controllers: [CalcController],
    providers: [
        DatabaseListenerDAO,
        PropertyService,
        ListingDAO,
        CalculationsApiClient,
        {
            provide: ListingManager,
            useFactory: (listingDAO: ListingDAO) => {
                const commit: boolean = applicationConfig.commit;
                return new ListingManager(listingDAO, commit);
            },
            inject: [ListingDAO],
        },
        {
            provide: CalculationsCacheHandler,
            useFactory: (
                calculationsApiClient: CalculationsApiClient,
                listingManager: ListingManager
            ) => {
                const enableCacheUpdates: boolean = applicationConfig.enableCacheUpdates;
                return new CalculationsCacheHandler(enableCacheUpdates, calculationsApiClient, listingManager);
            },
            inject: [CalculationsApiClient, ListingManager],
        },
        {
            provide: PropertyTransactionService,
            useFactory: (
                databaseService: DatabaseService,
                propertyService: PropertyService,
            ) => {
                const enableCacheUpdates: boolean = applicationConfig.enableCacheUpdates;
                return new PropertyTransactionService(databaseService, propertyService, enableCacheUpdates);
            },
            inject: [DatabaseService, PropertyService],
        },
    ],
    exports: [PropertyTransactionService],  // Export PropertyTransactionService if it's used in other modules
})
export class CalcModule { }
