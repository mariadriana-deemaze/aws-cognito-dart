import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { Logger } from 'nestjs-pino';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { GlobalValidationPipe } from './common/pipes/global-validation.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), { bufferLogs: true });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(app.get(Logger));

  app.useGlobalPipes(GlobalValidationPipe);

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? '3000', '0.0.0.0');
}
bootstrap();
