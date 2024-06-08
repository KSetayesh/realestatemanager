import { Module, forwardRef } from '@nestjs/common';
import { CalcController } from './controllers/calc.controller';
import { CalcService } from './services/calc.service';
import { RentCastService } from './services/rentcast.service';
import { DatabaseService } from 'src/db/database.service';
import { RentCastDAO } from 'src/db/realestate/dao/rentcast.dao';
import { ListingDAO } from 'src/db/realestate/dao/listing.dao';
import { ListingManager } from 'src/db/realestate/dbmanager/listing.manager';
import applicationConfig from 'src/config/applicationConfig';
import { RentCastManager } from 'src/db/realestate/dbmanager/rentcast.manager';
import { RentCastApiClient } from './api/rent.cast.api.client';
import { AppModule } from 'src/app.module';

@Module({
    imports: [forwardRef(() => AppModule)],  // Ensure AppModule is imported using forwardRef to avoid circular dependency
    controllers: [CalcController],
    providers: [
        CalcService,
        RentCastService,
        ListingDAO,
        RentCastDAO,
        RentCastApiClient,
        {
            provide: ListingManager,
            useFactory: (listingDAO: ListingDAO) => {
                const commit: boolean = applicationConfig.commit;
                return new ListingManager(listingDAO, commit);
            },
            inject: [ListingDAO],
        },
        {
            provide: RentCastManager,
            useFactory: (rentCastDAO: RentCastDAO) => {
                const commit: boolean = applicationConfig.commit;
                return new RentCastManager(rentCastDAO, commit);
            },
            inject: [RentCastDAO],
        },
    ],
    exports: [CalcService],  // Export CalcService if it's used in other modules
})
export class CalcModule { }
