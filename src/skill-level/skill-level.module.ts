import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { GetSkillLevelsController } from './get-skill-levels.controller.js';

@Module({
  controllers: [GetSkillLevelsController],
  imports: [DrizzleOrmModule],
})
export class SkillLevelModule {}
