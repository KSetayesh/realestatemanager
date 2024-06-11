import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ServeStaticMiddleware } from './serve-static.middleware';
import { PathUtil } from './utility/PathUtil';
import * as bodyParser from 'body-parser';

const port = process.env.PORT || 3000;

async function bootstrap() {
    console.log('---Starting RealEstate application---');
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();

    // Set a global prefix for all API routes
    app.setGlobalPrefix('api');

    // Serve the static files from the React app
    app.useStaticAssets(PathUtil.getStaticAssetsPath());

    // Apply the ServeStaticMiddleware
    app.use(new ServeStaticMiddleware().use);

    // Increase the payload size limit
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    await app.listen(port);

    console.log(`App is now listening on port ${port}`);
    console.log(`URL: http://localhost:${port}`);

}

bootstrap();
