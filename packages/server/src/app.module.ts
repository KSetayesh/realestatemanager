import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcModule } from './realestatecalc/calc.module';

@Module({
    imports: [CalcModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
