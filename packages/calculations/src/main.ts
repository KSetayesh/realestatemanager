import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as bodyParser from 'body-parser';

const port = process.env.PORT || 3001;

async function bootstrap() {
    console.log('---Starting Calculations application---');
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();

    // Set a global prefix for all API routes
    app.setGlobalPrefix('api');

    // Increase the payload size limit
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    await app.listen(port);

    console.log(`Calculations App is now listening on port ${port}`);
    console.log(`URL: http://localhost:${port}`);

}

bootstrap();
