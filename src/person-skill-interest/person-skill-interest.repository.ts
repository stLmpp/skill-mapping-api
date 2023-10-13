import { Injectable } from '@nestjs/common';
import { eq, InferInsertModel } from 'drizzle-orm';

import { Drizzle } from '../drizzle-orm.module.js';
import { PersonSkillInterestEntity } from '../schema.js';

@Injectable()
export class PersonSkillInterestRepository {
  constructor(private readonly drizzle: Drizzle) {}

  async deleteByPersonId(personId: number): Promise<void> {
    await this.drizzle
      .delete(PersonSkillInterestEntity)
      .where(eq(PersonSkillInterestEntity.personId, personId));
  }

  async createMany(dto: InferInsertModel<typeof PersonSkillInterestEntity>[]) {
    return this.drizzle
      .insert(PersonSkillInterestEntity)
      .values(dto)
      .returning();
  }
}
