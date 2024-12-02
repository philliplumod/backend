import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const port = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with the correct frontend URL
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your actual frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies) to be sent with the request
  });

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Motorcycle Rental API')
    .setDescription('The Motorcycle Rental API description')
    .addBearerAuth({ in: 'header', type: 'http' }) // Bearer token for authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // This sets the Swagger UI at /api

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api`);
}

bootstrap();
