import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotosModule } from './modules/photos/photos.module';
import { PathUtil } from './shared/PathUtil';
import { DatabaseService } from './db/database.service';
import { CalcModule } from './modules/realestatecalc/calc.module';
import { HighYieldSavingsModule } from './modules/highyieldsavingscalc/highyieldsavings.module';
import { AgentModule } from './modules/agents/agent.module';

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
