import { Module } from '@nestjs/common';
import { AppdescriptionService } from './service/appdescription.service';
import { AppdescriptionController } from './controllers/appdescription.controller';

@Module({
  providers: [AppdescriptionService],
  controllers: [AppdescriptionController]
})
export class AppdescriptionModule {}

