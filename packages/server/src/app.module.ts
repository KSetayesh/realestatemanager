import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CalcModule } from './calc/calc.module';

@Module({
  imports: [UsersModule, CalcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
