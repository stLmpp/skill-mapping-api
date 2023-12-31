import { Controller, Get } from '@nestjs/common';
import { ZRes } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';
import { SkillLevelEntity } from '../schema.js';

import { SkillLevelDto } from './dto/skill-level.dto.js';

@Controller({
  version: '1',
})
export class GetSkillLevelsController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes([SkillLevelDto])
  @Get()
  async get(): Promise<SkillLevelDto[]> {
    const entities = await this.drizzle
      .select({
        skillLevelId: SkillLevelEntity.id,
        skillLevelName: SkillLevelEntity.name,
        skillLevelDescription: SkillLevelEntity.description,
      })
      .from(SkillLevelEntity);
    return entities.map((entity) => ({
      ...entity,
      skillLevelDescription: entity.skillLevelDescription ?? undefined,
    }));
  }
}
