import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { PersonSkillRepository } from './person-skill.repository.js';

@Module({
  imports: [DrizzleOrmModule],
  providers: [PersonSkillRepository],
  exports: [PersonSkillRepository],
})
export class PersonSkillModule {}
