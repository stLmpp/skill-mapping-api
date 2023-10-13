import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { PersonSkillInterestRepository } from './person-skill-interest.repository.js';

@Module({
  imports: [DrizzleOrmModule],
  exports: [PersonSkillInterestRepository],
  providers: [PersonSkillInterestRepository],
})
export class PersonSkillInterestModule {}
