import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { generateChunkFiles } from './infra/local-file/videotohlschunks';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const ALLOWED_CORS_ORIGIN = configService.get('FRONTEND_URL');

  app.enableCors({
    origin: ALLOWED_CORS_ORIGIN,
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE',
  });

  const config = new DocumentBuilder()
    .setTitle('Elearning')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();

  app.useStaticAssets(join(__dirname, '../', '/public'));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await generateChunkFiles();
  await app.listen(5000);
}
bootstrap();
