import { Controller, Delete } from '@nestjs/common';
import { Exceptions, ZParams, ZRes } from '@st-api/core';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../../drizzle-orm.module.js';
import { PersonSkillInterestEntity } from '../../schema.js';
import { PersonNotFound } from '../exceptions.js';
import { PersonValidationService } from '../person-validation.service.js';

import { RemoveInterestParams } from './remove-interest.params.js';

@Controller({
  path: ':personId/skill-interest/:skillId',
  version: '1',
})
export class RemoveInterestController {
  constructor(
    private readonly personValidationService: PersonValidationService,
    private readonly drizzle: Drizzle,
  ) {}

  @Exceptions([PersonNotFound])
  @ZRes(z.void())
  @Delete()
  async removeInterest(
    @ZParams() { skillId, personId }: RemoveInterestParams,
  ): Promise<void> {
    await this.personValidationService.assertPersonExists(personId);
    await this.drizzle
      .delete(PersonSkillInterestEntity)
      .where(
        and(
          eq(PersonSkillInterestEntity.personId, personId),
          eq(PersonSkillInterestEntity.skillId, skillId),
        ),
      );
  }
}
