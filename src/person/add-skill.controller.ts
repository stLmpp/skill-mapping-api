import { Controller, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Body, Exceptions, Params, Response } from '@st-api/core';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../drizzle-orm.module.js';
import { PersonSkillEntity, SkillEntity, SkillLevelEntity } from '../schema.js';

import { AddSkillDto } from './dto/add-skill.dto.js';
import { AddSkillParams } from './dto/add-skill.params.js';
import {
  PersonNotFound,
  SkillLevelNotFoundBadRequest,
  SkillNotFound,
} from './exceptions.js';
import { PersonValidationService } from './person-validation.service.js';

@ApiTags('Person')
@Controller({
  version: '1',
  path: ':personId/skill/:skillId',
})
export class AddSkillController {
  constructor(
    private readonly drizzle: Drizzle,
    private readonly personValidationService: PersonValidationService,
  ) {}

  private async assertSkillIdExists(skillId: number): Promise<void> {
    const [skill] = await this.drizzle
      .select({ id: SkillEntity.id })
      .from(SkillEntity)
      .where(eq(SkillEntity.id, skillId));
    if (!skill) {
      throw SkillNotFound(`Skill with id ${skillId} not found`);
    }
  }

  private async assertSkillLevelIdExists(skillLevelId: number): Promise<void> {
    const [skillLevel] = await this.drizzle
      .select({ id: SkillLevelEntity.id })
      .from(SkillLevelEntity)
      .where(eq(SkillLevelEntity.id, skillLevelId));
    if (!skillLevel) {
      throw SkillLevelNotFoundBadRequest(
        `Skill level with id ${skillLevelId} not found`,
      );
    }
  }

  @Exceptions([PersonNotFound, SkillNotFound, SkillLevelNotFoundBadRequest])
  @Response(z.void())
  @Put()
  async addSkill(
    @Params() { personId, skillId }: AddSkillParams,
    @Body() { skillLevelId }: AddSkillDto,
  ): Promise<void> {
    await this.personValidationService.assertPersonExists(personId);
    await this.assertSkillIdExists(skillId);
    await this.assertSkillLevelIdExists(skillLevelId);

    const [personSkill] = await this.drizzle
      .select({
        id: PersonSkillEntity,
      })
      .from(PersonSkillEntity)
      .where(eq(PersonSkillEntity.personId, personId))
      .where(eq(PersonSkillEntity.skillId, skillId));

    if (!personSkill) {
      return;
    }

    await this.drizzle.insert(PersonSkillEntity).values({
      personId,
      skillId,
      skillLevelId,
    });
  }
}
