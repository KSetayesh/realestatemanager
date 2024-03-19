import { Module } from '@nestjs/common';
import { HighYieldSavingsCalcController } from './controllers/highyieldsavings.controller';
import { HighYieldSavingsCalcService } from './services/highyieldsavings.calc.service';

@Module({
    controllers: [HighYieldSavingsCalcController],
    providers: [HighYieldSavingsCalcService]
})
export class HighYieldSavingsModule { }
