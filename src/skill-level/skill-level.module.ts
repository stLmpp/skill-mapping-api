import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { SkillLevelController } from './skill-level.controller.js';
import { SkillLevelRepository } from './skill-level.repository.js';

@Module({
  controllers: [SkillLevelController],
  imports: [DrizzleOrmModule],
  providers: [SkillLevelRepository],
  exports: [SkillLevelRepository],
})
export class SkillLevelModule {}
