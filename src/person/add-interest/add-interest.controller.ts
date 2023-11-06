import { Controller, Put } from '@nestjs/common';
import { Exceptions, ZParams, ZRes } from '@st-api/core';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../../drizzle-orm.module.js';
import { PersonSkillInterestEntity } from '../../schema.js';
import { PersonNotFound, SkillNotFound } from '../exceptions.js';
import { PersonValidationService } from '../person-validation.service.js';

import { AddInterestParams } from './add-interest.params.js';

@Controller({
  path: ':personId/skill-interest/:skillId',
  version: '1',
})
export class AddInterestController {
  constructor(
    private readonly personValidationService: PersonValidationService,
    private readonly drizzle: Drizzle,
  ) {}

  @Exceptions([PersonNotFound, SkillNotFound])
  @ZRes(z.void())
  @Put()
  async addInterest(
    @ZParams() { skillId, personId }: AddInterestParams,
  ): Promise<void> {
    await this.personValidationService.assertPersonExists(personId);
    await this.personValidationService.assertSkillExists(skillId);
    const [personSkillInterest] = await this.drizzle
      .select({
        id: PersonSkillInterestEntity.id,
      })
      .from(PersonSkillInterestEntity)
      .where(
        and(
          eq(PersonSkillInterestEntity.personId, personId),
          eq(PersonSkillInterestEntity.skillId, skillId),
        ),
      );
    if (personSkillInterest) {
      return;
    }
    await this.drizzle.insert(PersonSkillInterestEntity).values({
      personId,
      skillId,
    });
  }
}
