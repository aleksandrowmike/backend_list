import { NestFactory } from "@nestjs/core";
import * as helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
