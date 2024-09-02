import { NestFactory } from "@nestjs/core";
import { PokedexApiModule } from "./pokedex-api.module";

async function bootstrap() {
  const app = await NestFactory.create(PokedexApiModule);
  app.setGlobalPrefix("api");
  app.enableCors({ origin: ["http://localhost:4200", "*"] });
  await app.listen(3000);
}

bootstrap();
