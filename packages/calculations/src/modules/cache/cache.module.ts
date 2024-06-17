import { Module } from '@nestjs/common';
import { CacheController } from './controllers/cache.controller';
import { CalcService } from './services/calc.service';
import { RedisCacheService } from './services/redis.cache.service';

@Module({
    imports: [],
    controllers: [CacheController],
    providers: [RedisCacheService, CalcService],
})
export class CacheModule { }
