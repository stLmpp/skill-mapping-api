import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { SkillLevelController } from './skill-level.controller.js';

@Module({
  controllers: [SkillLevelController],
  imports: [DrizzleOrmModule],
})
export class SkillLevelModule {}
