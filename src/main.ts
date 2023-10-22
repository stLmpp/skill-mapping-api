import { Logger } from '@nestjs/common';
import { createApp } from '@st-api/core';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const { nestApp: app } = await createApp({
    module: AppModule,
  });
  const isDev = process.env.NODE_ENV !== 'production';
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? 3000;
  const protocol = isDev ? 'http' : 'https';
  await app.listen(port, host);
  Logger.log(`Listening at ${protocol}://${host}:${port}`);
  Logger.log(`Help at ${protocol}://${host}:${port}/help`);
}
bootstrap();
