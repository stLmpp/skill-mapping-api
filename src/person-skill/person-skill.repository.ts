import { Injectable } from '@nestjs/common';
import { eq, InferInsertModel } from 'drizzle-orm';

import { Drizzle } from '../drizzle-orm.module.js';
import { PersonSkillEntity } from '../schema.js';

@Injectable()
export class PersonSkillRepository {
  constructor(private readonly drizzle: Drizzle) {}

  async deleteByPersonId(personId: number): Promise<void> {
    await this.drizzle
      .delete(PersonSkillEntity)
      .where(eq(PersonSkillEntity.personId, personId));
  }

  async createMany(dto: InferInsertModel<typeof PersonSkillEntity>[]) {
    return this.drizzle.insert(PersonSkillEntity).values(dto).returning();
  }
}
