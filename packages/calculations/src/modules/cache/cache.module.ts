import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { CacheController } from './controllers/cache.controller';
import { CalcService } from './services/calc.service';
import { RedisCacheService } from './services/redis.cache.service';

@Module({
    imports: [],
    controllers: [CacheController],
    providers: [RedisCacheService, CacheService, CalcService],
})
export class CacheModule { }
