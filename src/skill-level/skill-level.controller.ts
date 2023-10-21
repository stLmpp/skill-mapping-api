import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';
import { SkillLevelEntity } from '../schema.js';

import { SkillLevelDto } from './dto/skill-level.dto.js';

@ApiTags('Skill level')
@Controller({
  version: '1',
})
export class SkillLevelController {
  constructor(private readonly drizzle: Drizzle) {}

  @Response([SkillLevelDto])
  @Get()
  async get(): Promise<SkillLevelDto[]> {
    return this.drizzle
      .select({
        skillLevelId: SkillLevelEntity.id,
        skillLevelName: SkillLevelEntity.name,
      })
      .from(SkillLevelEntity);
  }
}
