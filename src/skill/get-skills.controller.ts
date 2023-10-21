import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';
import { SkillEntity } from '../schema.js';

import { SkillDto } from './dto/skill.dto.js';

@ApiTags('Skill')
@Controller({
  version: '1',
})
export class GetSkillsController {
  constructor(private readonly drizzle: Drizzle) {}

  @Response([SkillDto])
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
