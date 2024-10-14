import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { HttpErrorFilter } from './handler/http-error.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express'; // Import ExpressAdapter if you're using Express

async function bootstrap() {
  dotenv.config();

  // Explicitly use the Express adapter
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  // Apply validation and error filters
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpErrorFilter());

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Serve Swagger UI at /api

  await app.listen(3000);
}

bootstrap();
