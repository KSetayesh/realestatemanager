//     //import dotenv from 'dotenv';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// // dotenv.config();
// import express, { Express, Request, Response } from 'express';

// // const app: Express = express();
// const port = process.env.API_PORT || '3000';

// async function bootstrap() {
//     const app = await NestFactory.create(AppModule);
//     app.enableCors();
//     await app.listen(port);
//     console.log();
//     console.log();
// }

// bootstrap();


// import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './db/dbManager';
// import * as net from 'net';
// import { exec } from 'child_process';

// dotenv.config();
import express, { Express, Request, Response } from 'express';

// const app: Express = express();
const port = process.env.API_PORT || '3000';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();


    await app.listen(port);

    console.log(`App is now listening on port ${port}`);
    console.log(`URL: http://localhost:${port}`);
}

bootstrap();