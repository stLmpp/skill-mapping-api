import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { SkillLevelRepository } from './skill-level.repository.js';

@Module({
  imports: [DrizzleOrmModule],
  providers: [SkillLevelRepository],
  exports: [SkillLevelRepository],
})
export class SkillLevelModule {}
