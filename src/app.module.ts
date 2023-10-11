import { CoreModule } from '@assis-delivery/core';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DrizzleOrmModule } from './drizzle-orm.module.js';

@Module({
  imports: [CoreModule.forRoot(), DrizzleOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
