import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { API_PREFIX } from './__shared__/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(API_PREFIX);

  app.enableCors({
    origin: configService.get('FRONTEND_HOST'),
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The TaskQ REST Full API')
    .addCookieAuth('optional-session-id')
    .setVersion('1.0')
    .addCookieAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Workspaces')
    .addTag('Metrics')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_PREFIX, app, document);

  app.enableShutdownHooks();
  await app.listen(3000);
}

bootstrap();
