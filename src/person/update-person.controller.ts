import { Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Body, Exceptions, Params, Response } from '@st-api/core';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../drizzle-orm.module.js';
import { PersonEntity } from '../schema.js';

import { UpdatePersonDto } from './dto/update-person.dto.js';
import {
  UpdatePersonByEidParams,
  UpdatePersonByIdParams,
} from './dto/update-person.params.js';
import { PersonNotFound } from './exceptions.js';
import { PersonValidationService } from './person-validation.service.js';

@ApiTags('Person')
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
    const { chapterId, otherInformation, lastCustomerId, careerLevelId } = body;
    await this.drizzle.update(PersonEntity).set({
      chapterId,
      lastCustomerId,
      otherInformation,
      careerLevelId,
    });
  }

  @Response(z.void())
  @Exceptions([PersonNotFound])
  @Patch(':personId')
  async updateById(
    @Params() { personId }: UpdatePersonByIdParams,
    @Body() body: UpdatePersonDto,
  ): Promise<void> {
    await this.update(personId, body);
  }

  @Response(z.void())
  @Exceptions([PersonNotFound])
  @Patch('eid/:eid')
  async updateByEid(
    @Params() { eid }: UpdatePersonByEidParams,
    @Body() body: UpdatePersonDto,
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
