import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { CalcModule } from './realestatecalc/calc.module';
import { HighYieldSavingsModule } from './highyieldsavingscalc/highyieldsavings.module';
import { AgentModule } from './agents/agent.module';
import { RentCastModule } from './rentcast/rentcast.module';
import { PathUtil } from 'src/utility/PathUtil';
import { DatabaseService } from '../db/database.service';
import { DatabaseListenerDAO } from '../db/database.listener.dao';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { ListingDAO } from 'src/db/realestate/dao/listing.dao';
import applicationConfig from 'src/config/applicationConfig';
import { CalculationsCacheHandler } from './realestatecalc/api/calculations.cache.handler';
import { CalculationsApiClient } from './realestatecalc/api/calculations.api.client';
import { InitService } from './init.service';
import { PropertyTransactionService } from './realestatecalc/services/property.transaction.service';
import { AppdescriptionModule } from './appdescription/appdescription.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: PathUtil.getStaticAssetsPath(),
        }),
        CalcModule,
        HighYieldSavingsModule,
        AgentModule,
        PhotosModule,
        RentCastModule,
        AppdescriptionModule,
    ],
    controllers: [],
    providers: [
        DatabaseService,
        ListingDAO,
        {
            provide: ListingManager,
            useFactory: (listingDAO: ListingDAO) => {
                const commit: boolean = applicationConfig.commit;
                return new ListingManager(listingDAO, commit);
            },
            inject: [ListingDAO],
        },
        CalculationsApiClient,
        {
            provide: CalculationsCacheHandler,
            useFactory: (
                calculationsApiClient: CalculationsApiClient,
            ) => {
                return new CalculationsCacheHandler(calculationsApiClient);
            },
            inject: [CalculationsApiClient, ListingManager],
        },
        {
            provide: DatabaseListenerDAO,
            useFactory: (
                databaseService: DatabaseService,
                listingManager: ListingManager,
                cacheHandler: CalculationsCacheHandler,
            ) => {
                const enableCacheUpdates: boolean = applicationConfig.enableCacheUpdates;
                return new DatabaseListenerDAO(
                    databaseService,
                    listingManager,
                    cacheHandler,
                    enableCacheUpdates,
                );
            },
            inject: [DatabaseService, ListingManager, CalculationsCacheHandler],
        },
        {
            provide: InitService,
            useFactory: (
                databaseService: DatabaseService,
                databaseListener: DatabaseListenerDAO,
                propertyTransactionService: PropertyTransactionService,
            ) => {
                const enableCacheUpdates: boolean = applicationConfig.enableCacheUpdates;
                return new InitService(
                    databaseService,
                    databaseListener,
                    propertyTransactionService,
                    enableCacheUpdates,
                );
            },
            inject: [DatabaseService, DatabaseListenerDAO, PropertyTransactionService],
        },
    ],
    exports: [DatabaseService, ListingManager, ListingDAO, CalculationsCacheHandler],
})
export class AppModule { }
