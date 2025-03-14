import { Module, forwardRef } from '@nestjs/common';
import { CalcController } from './controllers/calc.controller';
import { PropertyTransactionService } from './services/property.transaction.service';
import applicationConfig from 'src/config/applicationConfig';
import { AppModule } from '../app.module';
import { PropertyService } from './services/property.service';
import { DatabaseService } from 'src/db/database.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';

@Module({
    imports: [
        forwardRef(() => AppModule),
        ScheduleModule.forRoot(),
    ],  // Ensure AppModule is imported using forwardRef to avoid circular dependency
    controllers: [CalcController],
    providers: [
        PropertyService,
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
        TaskService,
    ],
    exports: [PropertyTransactionService],  // Export PropertyTransactionService if it's used in other modules
})
export class CalcModule { }
