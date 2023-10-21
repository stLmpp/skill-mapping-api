import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { GetCareerLevelsController } from './get-career-levels.controller.js';

@Module({
  imports: [DrizzleOrmModule],
  controllers: [GetCareerLevelsController],
})
export class CareerLevelModule {}
