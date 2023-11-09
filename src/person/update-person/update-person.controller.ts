import { Controller, Patch } from '@nestjs/common';
import { Exceptions, ZBody, ZParams, ZRes } from '@st-api/core';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../../drizzle-orm.module.js';
import { PersonEntity } from '../../schema.js';
import { PersonNotFound } from '../exceptions.js';
import { PersonValidationService } from '../person-validation.service.js';

import { UpdatePersonDto } from './update-person.dto.js';
import {
  UpdatePersonByEidParams,
  UpdatePersonByIdParams,
} from './update-person.params.js';

@Controller({
  version: '1',
})
export class UpdatePersonController {
  constructor(
    private readonly drizzle: Drizzle,
    private readonly personValidationService: PersonValidationService,
  ) {}

  private async update(personId: number, body: UpdatePersonDto): Promise<void> {
    await this.personValidationService.assertPersonExists(personId);
    if (!Object.keys(body).length) {
      return;
    }
    const {
      chapterId,
      otherInformation,
      lastCustomerId,
      careerLevelId,
      peopleLeadEid,
      lastJobRoleId,
    } = body;
    await this.drizzle.update(PersonEntity).set({
      chapterId,
      lastCustomerId,
      otherInformation,
      careerLevelId,
      peopleLeadEid,
      lastJobRoleId,
    });
  }

  @ZRes(z.void())
  @Exceptions([PersonNotFound])
  @Patch(':personId')
  async updateById(
    @ZParams() { personId }: UpdatePersonByIdParams,
    @ZBody() body: UpdatePersonDto,
  ): Promise<void> {
    await this.update(personId, body);
  }

  @ZRes(z.void())
  @Exceptions([PersonNotFound])
  @Patch('eid/:eid')
  async updateByEid(
    @ZParams() { eid }: UpdatePersonByEidParams,
    @ZBody() body: UpdatePersonDto,
  ): Promise<void> {
    const [person] = await this.drizzle
      .select({ id: PersonEntity.id })
      .from(PersonEntity)
      .where(eq(PersonEntity.eid, eid));
    if (!person) {
      throw PersonNotFound(`Person with eid ${eid} not found`);
    }
    await this.update(person.id, body);
  }
}
