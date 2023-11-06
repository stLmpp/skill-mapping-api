import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { Drizzle } from '../drizzle-orm.module.js';
import { PersonEntity, SkillEntity } from '../schema.js';

import { PersonNotFound, SkillNotFound } from './exceptions.js';

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

  async assertSkillExists(skillId: number): Promise<void> {
    const [skill] = await this.drizzle
      .select({ id: SkillEntity.id })
      .from(SkillEntity)
      .where(eq(SkillEntity.id, skillId));
    if (!skill) {
      throw SkillNotFound(`Skill with id ${skillId} not found`);
    }
  }
}
