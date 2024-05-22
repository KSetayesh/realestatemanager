import { Module } from '@nestjs/common';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcModule } from './realestatecalc/calc.module';
import { HighYieldSavingsModule } from './highyieldsavingscalc/highyieldsavings.module';
import { AgentModule } from './agents/agent.module';
import { PhotosModule } from './photos/photos.module';

@Module({
    imports: [
        // ServeStaticModule.forRoot({
        //     rootPath: join(__dirname, '..', '..', 'photos'), // Adjusted path
        //     serveRoot: '/photos', // URL path to serve static files
        // }),
        CalcModule,
        HighYieldSavingsModule,
        AgentModule,
        PhotosModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
