import { Module } from '@nestjs/common';
import { CalcController } from './controllers/calc.controller';
import { CalcService } from './services/calc.service';

@Module({
    controllers: [CalcController],
    providers: [CalcService]
})
export class CalcModule { }
