import { Controller, Get } from '@nestjs/common';
import { ZRes } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';
import { SkillEntity } from '../schema.js';

import { SkillDto } from './dto/skill.dto.js';

@Controller({
  version: '1',
})
export class GetSkillsController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes([SkillDto])
  @Get()
  async getAll(): Promise<SkillDto[]> {
    const entities = await this.drizzle
      .select({
        skillId: SkillEntity.id,
        skillName: SkillEntity.name,
        skillDescription: SkillEntity.description,
      })
      .from(SkillEntity);
    return entities.map((entity) => ({
      ...entity,
      skillDescription: entity.skillDescription ?? undefined,
    }));
  }
}
