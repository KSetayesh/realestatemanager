import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { CacheController } from './controllers/cache.controller';
import { CalcService } from './services/calc.service';

@Module({
    imports: [],
    controllers: [CacheController],
    providers: [CacheService, CalcService],
})
export class CacheModule { }
