import { Module } from '@nestjs/common';
import { RentCastService } from './service/rentcast.service';
import { RentCastController } from './controller/rentcast.controller';
import { DatabaseService } from 'src/db/database.service';
import { RentCastManager } from 'src/db/realestate/dbmanager/rentcast.manager';
import { RentCastDAO } from 'src/db/realestate/dao/rentcast.dao';
import applicationConfig from 'src/config/applicationConfig';
import { RentCastApiClient } from './api/rent.cast.api.client';
import { CalcModule } from '../realestatecalc/calc.module';

@Module({
    imports: [CalcModule],  // Ensure CalcModule is imported
    providers: [
        RentCastService,
        DatabaseService,
        RentCastDAO,
        RentCastApiClient,
        {
            provide: RentCastManager,
            useFactory: (rentCastDAO: RentCastDAO) => {
                const commit: boolean = applicationConfig.commit;
                return new RentCastManager(rentCastDAO, commit);
            },
            inject: [RentCastDAO],
        },
    ],
    controllers: [RentCastController]
})
export class RentCastModule { }
