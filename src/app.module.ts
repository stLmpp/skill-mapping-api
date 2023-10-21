import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CoreModule } from '@st-api/core';

import { CareerLevelModule } from './career-level/career-level.module.js';
import { ChapterModule } from './chapter/chapter.module.js';
import { CustomerModule } from './customer/customer.module.js';
import { DrizzleOrmModule } from './drizzle-orm.module.js';
import { PersonModule } from './person/person.module.js';
import { SkillModule } from './skill/skill.module.js';
import { SkillLevelModule } from './skill-level/skill-level.module.js';

@Module({
  imports: [
    CoreModule.forRoot(),
    DrizzleOrmModule,
    RouterModule.register([
      { path: 'person', module: PersonModule },
      { path: 'skill-level', module: SkillLevelModule },
      { path: 'skill', module: SkillModule },
      { path: 'customer', module: CustomerModule },
      { path: 'chapter', module: ChapterModule },
      { path: 'career-level', module: CareerLevelModule },
    ]),
    PersonModule,
    SkillLevelModule,
    SkillModule,
    CustomerModule,
    ChapterModule,
    CareerLevelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
