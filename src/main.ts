import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    });

    // app.use(
    //     rateLimit({
    //         windowMs: 15 * 60 * 1000, // 15 minutes
    //         max: 500, // limit each IP to 500 requests per windowMs
    //     }),
    // );

    // Automatically validate data on every request
    // app.useGlobalPipes();

    const config = new DocumentBuilder()
        .setTitle('MakeEasyCommerce')
        .setDescription('AllCommerceInOneCentralizedSystem')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(process.env.API_PORT);
}
void bootstrap();
