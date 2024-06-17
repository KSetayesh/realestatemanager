import { Module } from '@nestjs/common';
import { CacheModule } from './modules/cache/cache.module';

@Module({
  imports: [CacheModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

