import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { Drizzle } from '../drizzle-orm.module.js';
import { PersonEntity } from '../schema.js';

import { PersonNotFound } from './exceptions.js';

@Injectable()
export class PersonValidationService {
  constructor(private readonly drizzle: Drizzle) {}

  async assertPersonExists(personId: number): Promise<void> {
    const [person] = await this.drizzle
      .select({
        id: PersonEntity.id,
      })
      .from(PersonEntity)
      .where(eq(PersonEntity.id, personId));
    if (!person) {
      throw PersonNotFound(`Person with id ${personId} not found`);
    }
  }
}
