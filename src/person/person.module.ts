import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';
import { PersonSkillModule } from '../person-skill/person-skill.module.js';
import { SkillModule } from '../skill/skill.module.js';
import { SkillLevelModule } from '../skill-level/skill-level.module.js';

import { PersonController } from './person.controller.js';
import { PersonRepository } from './person.repository.js';

@Module({
  imports: [DrizzleOrmModule, PersonSkillModule, SkillLevelModule, SkillModule],
  controllers: [PersonController],
  providers: [PersonRepository],
})
export class PersonModule {}
