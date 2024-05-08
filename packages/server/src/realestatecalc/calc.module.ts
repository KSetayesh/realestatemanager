import { Module } from '@nestjs/common';
import { CalcController } from './controllers/calc.controller';
import { CalcService } from './services/calc.service';
import { RentCastService } from './services/rentcast.service';

@Module({
    controllers: [CalcController],
    providers: [CalcService, RentCastService]
})
export class CalcModule { }
