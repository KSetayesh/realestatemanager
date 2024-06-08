import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotosModule } from './photos/photos.module';
import { DatabaseService } from '../db/database.service';
import { CalcModule } from './realestatecalc/calc.module';
import { HighYieldSavingsModule } from './highyieldsavingscalc/highyieldsavings.module';
import { AgentModule } from './agents/agent.module';
import { PathUtil } from 'src/shared/PathUtil';

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: PathUtil.getStaticAssetsPath(),
        }),
        CalcModule,
        HighYieldSavingsModule,
        AgentModule,
        PhotosModule,
    ],
    controllers: [AppController],
    providers: [AppService, DatabaseService],
    exports: [DatabaseService],
})
export class AppModule { }
