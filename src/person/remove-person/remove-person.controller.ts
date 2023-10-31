import { Controller, Delete, HttpStatus } from '@nestjs/common';
import { ZParams, ZRes } from '@st-api/core';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../../drizzle-orm.module.js';
import {
  PersonEntity,
  PersonSkillEntity,
  PersonSkillInterestEntity,
} from '../../schema.js';

import { RemovePersonParams } from './remove-person.params.js';

@Controller({
  version: '1',
  path: ':personId',
})
export class RemovePersonController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes(z.void(), HttpStatus.NO_CONTENT)
  @Delete()
  async removePerson(
    @ZParams() { personId }: RemovePersonParams,
  ): Promise<void> {
    await this.drizzle.transaction(async (transaction) => {
      await transaction
        .delete(PersonSkillEntity)
        .where(eq(PersonSkillEntity.personId, personId));
      await transaction
        .delete(PersonSkillInterestEntity)
        .where(eq(PersonSkillInterestEntity.personId, personId));
      await transaction
        .delete(PersonEntity)
        .where(eq(PersonEntity.id, personId));
    });
  }
}
