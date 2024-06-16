import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PropertyTransactionService } from './services/property.transaction.service';

@Injectable()
export class TaskService {
    constructor(
        private readonly propertyTransactionService: PropertyTransactionService, // Inject the service
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        console.log('Running the task every day at midnight');
        try {
            await this.propertyTransactionService.setupCache();
            console.log('Cache setup completed successfully');
        } catch (error) {
            console.error('Error during cache setup:', error);
        }
    }
}
