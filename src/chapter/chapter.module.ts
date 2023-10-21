import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { GetChaptersController } from './get-chapters.controller.js';

@Module({
  imports: [DrizzleOrmModule],
  controllers: [GetChaptersController],
})
export class ChapterModule {}
