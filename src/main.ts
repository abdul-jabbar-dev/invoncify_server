import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // // Middleware for handling unmatched routes
  // app.use((req, res, next) => {
  //   next(new NotFoundException(`Cannot find ${req.originalUrl}`));
  // });

  // // Handling the error in a user-friendly way
  // app.useGlobalFilters({
  //   catch(exception: NotFoundException, host) {

  //     const ctx = host.switchToHttp();
  //     const response = ctx.getResponse();
  //     console.log({
  //       statusCode: 404,
  //       message: exception.message,
  //       path: ctx.getRequest().url,
  //     })
  //     response.status(404).json({
  //       statusCode: 404,
  //       message: exception.message,
  //       path: ctx.getRequest().url,
  //     });
  //   },
  // });

  await app.listen(3000);
}

bootstrap();
