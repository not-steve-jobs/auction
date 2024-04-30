import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from 'core/config/swagger.config';
import * as process from 'process';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'elastic-module/v1';

  app.setGlobalPrefix(globalPrefix);

  app.use(cookieParser(process.env.API_APP_SECRET));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = SwaggerConfig();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${globalPrefix}/swagger`, app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  const port = process.env.PORT || 9090;
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host);
}
void bootstrap().then(() => {
  console.log('----------> elastic_module Success Started.!');
});
