import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { GetAllLanguagesController } from './get-all-languages/get-all-languages.controller.js';

@Module({
  imports: [DrizzleOrmModule],
  controllers: [GetAllLanguagesController],
})
export class LanguageModule {}
