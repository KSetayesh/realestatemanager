import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcModule } from './realestatecalc/calc.module';
import { HighYieldSavingsModule } from './highyieldsavingscalc/highyieldsavings.module';

@Module({
    imports: [CalcModule, HighYieldSavingsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
