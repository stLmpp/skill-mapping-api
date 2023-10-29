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
    return this.drizzle
      .select({
        skillId: SkillEntity.id,
        skillName: SkillEntity.name,
      })
      .from(SkillEntity);
  }
}
