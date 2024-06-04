import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './users/dao/dbManager';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ServeStaticMiddleware } from './serve-static.middleware';
import { PathUtil } from './shared/PathUtil';
import { CalcService } from './realestatecalc/services/calc.service';

// const port = process.env.API_PORT || '3000';
const port = process.env.PORT || 3000;

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();

    // Set a global prefix for all API routes
    app.setGlobalPrefix('api');

    // Serve the static files from the React app
    app.useStaticAssets(PathUtil.getStaticAssetsPath());

    // Apply the ServeStaticMiddleware
    app.use(new ServeStaticMiddleware().use);

    await app.listen(port);

    console.log(`App is now listening on port ${port}`);
    console.log(`URL: http://localhost:${port}`);

    // pre-load property calculations
    await setCache(app);
}

async function setCache(app: NestExpressApplication) {
    console.log('\n---Setting property cache---\n');
    const calcService: CalcService = app.get(CalcService);
    await calcService.setCache();
    console.log('\n---Property cache has been set---\n');
}

bootstrap();



// // import dotenv from 'dotenv';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import './db/dbManager';
// // import * as net from 'net';
// // import { exec } from 'child_process';

// // dotenv.config();
// import express, { Express, Request, Response } from 'express';
// import { CalcService } from './realestatecalc/services/calc.service';

// // const app: Express = express();
// const port = process.env.API_PORT || '3000';

// async function bootstrap() {
//     const app = await NestFactory.create(AppModule);
//     app.enableCors();


//     await app.listen(port);

//     console.log(`App is now listening on port ${port}`);
//     console.log(`URL: http://localhost:${port}`);

//     // pre-load property calculations
//     console.log('\n---Setting property cache---\n');
//     const calcService: CalcService = app.get(CalcService);
//     await calcService.setCache();
//     console.log('\n---Property cache has been set---\n');
// }


// bootstrap();