import { Controller, Put } from '@nestjs/common';
import { Exceptions, ZBody, ZParams, ZRes } from '@st-api/core';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../../drizzle-orm.module.js';
import { PersonSkillEntity, SkillLevelEntity } from '../../schema.js';
import {
  PersonNotFound,
  SkillLevelNotFoundBadRequest,
  SkillNotFound,
} from '../exceptions.js';
import { PersonValidationService } from '../person-validation.service.js';

import { AddSkillDto } from './add-skill.dto.js';
import { AddSkillParams } from './add-skill.params.js';

@Controller({
  version: '1',
  path: ':personId/skill/:skillId',
})
export class AddSkillController {
  constructor(
    private readonly drizzle: Drizzle,
    private readonly personValidationService: PersonValidationService,
  ) {}

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
  @ZRes(z.void())
  @Put()
  async addSkill(
    @ZParams() { personId, skillId }: AddSkillParams,
    @ZBody() { skillLevelId }: AddSkillDto,
  ): Promise<void> {
    await this.personValidationService.assertPersonExists(personId);
    await this.personValidationService.assertSkillExists(skillId);
    await this.assertSkillLevelIdExists(skillLevelId);

    const [personSkill] = await this.drizzle
      .select({
        id: PersonSkillEntity,
      })
      .from(PersonSkillEntity)
      .where(
        and(
          eq(PersonSkillEntity.personId, personId),
          eq(PersonSkillEntity.skillId, skillId),
        ),
      );

    if (personSkill) {
      return;
    }

    await this.drizzle.insert(PersonSkillEntity).values({
      personId,
      skillId,
      skillLevelId,
    });
  }
}
