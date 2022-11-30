import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './httpException.filter';
import cookieParser from 'cookie-parser';
import session from 'express-session';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  app.setGlobalPrefix('api');
  console.log(`listening on port ${port}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Slaeck API')
    .setDescription('슬랙 클론 코딩을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
