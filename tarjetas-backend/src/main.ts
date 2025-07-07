import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ HABILITAR CORS
  app.enableCors();

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('API CRUD de Tarjetas')
    .setDescription('Documentación del CRUD de tarjetas con NestJS y MySQL')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Aplicación corriendo en: http://localhost:3000/`);
  console.log(`Swagger disponible en: http://localhost:3000/api`);
}
bootstrap();
