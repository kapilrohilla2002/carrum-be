
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/httpException';
import AppConfigService from './configs/appConfig.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, new FastifyAdapter()
  );

  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "maxAge": 600
  })

  // Register global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Register global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}
bootstrap();
