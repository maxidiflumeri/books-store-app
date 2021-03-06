import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  await app.listen(AppModule.port, () => {
    console.log(`Server listening on port ${AppModule.port}`)
  });
}
bootstrap();
