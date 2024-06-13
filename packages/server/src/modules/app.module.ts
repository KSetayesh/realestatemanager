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
import { DatabaseListenerDAO } from '../db/realestate/dao/database.listener.dao';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import { ListingDAO } from 'src/db/realestate/dao/listing.dao';
import applicationConfig from 'src/config/applicationConfig';
import { CalculationsCacheHandler } from './realestatecalc/api/calculations.cache.handler';
import { CalculationsApiClient } from './realestatecalc/api/calculations.api.client';
import { InitService } from './init.service';

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
                const enableCacheUpdates: boolean = applicationConfig.enableCacheUpdates;
                return new CalculationsCacheHandler(enableCacheUpdates, calculationsApiClient);
            },
            inject: [CalculationsApiClient, ListingManager],
        },
        DatabaseListenerDAO,
        InitService,
    ],
    exports: [DatabaseService, ListingManager, ListingDAO, CalculationsCacheHandler],
})
export class AppModule { }
