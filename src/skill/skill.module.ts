import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { GetSkillsController } from './get-skills.controller.js';

@Module({
  imports: [DrizzleOrmModule],
  controllers: [GetSkillsController],
})
export class SkillModule {}
