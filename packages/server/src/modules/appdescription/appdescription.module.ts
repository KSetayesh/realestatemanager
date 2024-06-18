import { Module } from '@nestjs/common';
import { AppDescriptionService } from './service/appdescription.service';
import { AppDescriptionController } from './controllers/appdescription.controller';

@Module({
    providers: [AppDescriptionService],
    controllers: [AppDescriptionController]
})
export class AppdescriptionModule { }

