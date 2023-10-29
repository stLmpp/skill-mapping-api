import { Controller, Delete } from '@nestjs/common';
import { Exceptions, ZParams } from '@st-api/core';
import { and, eq } from 'drizzle-orm';

import { Drizzle } from '../../drizzle-orm.module.js';
import { PersonSkillEntity } from '../../schema.js';
import { PersonNotFound } from '../exceptions.js';
import { PersonValidationService } from '../person-validation.service.js';

import { RemoveSkillParams } from './remove-skill.params.js';

@Controller({
  version: '1',
  path: ':personId/skill/:skillId',
})
export class RemoveSkillController {
  constructor(
    private readonly personValidationService: PersonValidationService,
    private readonly drizzle: Drizzle,
  ) {}

  @Exceptions([PersonNotFound])
  @Delete()
  async deleteSkill(
    @ZParams() { skillId, personId }: RemoveSkillParams,
  ): Promise<void> {
    await this.personValidationService.assertPersonExists(personId);
    await this.drizzle
      .delete(PersonSkillEntity)
      .where(
        and(
          eq(PersonSkillEntity.personId, personId),
          eq(PersonSkillEntity.skillId, skillId),
        ),
      );
  }
}
