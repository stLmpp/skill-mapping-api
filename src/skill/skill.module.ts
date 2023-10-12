import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { SkillRepository } from './skill.repository.js';

@Module({
  imports: [DrizzleOrmModule],
  providers: [SkillRepository],
  exports: [SkillRepository],
})
export class SkillModule {}
