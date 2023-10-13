import { Injectable } from '@nestjs/common';
import { eq, InferInsertModel } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';

import { Drizzle } from '../drizzle-orm.module.js';
import {
  PersonEntity,
  PersonSkillEntity,
  PersonSkillInterestEntity,
  SkillEntity,
  SkillLevelEntity,
} from '../schema.js';

@Injectable()
export class PersonRepository {
  constructor(private readonly drizzle: Drizzle) {}

  async findByPid(pid: string) {
    const [person] = await this.drizzle
      .select()
      .from(PersonEntity)
      .where(eq(PersonEntity.pid, pid));
    return person;
  }

  async findWithAllRelations() {
    const personSkillInterestSkillAlias = alias(SkillEntity, 'skill_2');
    return this.drizzle
      .select({
        pid: PersonEntity.pid,
        personId: PersonEntity.id,
        otherInformation: PersonEntity.otherInformation,
        skillId: SkillEntity.id,
        skillName: SkillEntity.name,
        personSkillId: PersonSkillEntity.id,
        skillLevelId: SkillLevelEntity.id,
        skillLevelName: SkillLevelEntity.name,
        interestSkillId: personSkillInterestSkillAlias.id,
        interestSkillName: personSkillInterestSkillAlias.name,
        interestId: PersonSkillInterestEntity.id,
      })
      .from(PersonEntity)
      .innerJoin(
        PersonSkillEntity,
        eq(PersonEntity.id, PersonSkillEntity.personId),
      )
      .innerJoin(SkillEntity, eq(PersonSkillEntity.skillId, SkillEntity.id))
      .innerJoin(
        SkillLevelEntity,
        eq(PersonSkillEntity.skillLevelId, SkillLevelEntity.id),
      )
      .leftJoin(
        PersonSkillInterestEntity,
        eq(PersonEntity.id, PersonSkillInterestEntity.personId),
      )
      .leftJoin(
        personSkillInterestSkillAlias,
        eq(personSkillInterestSkillAlias.id, PersonSkillInterestEntity.skillId),
      );
  }

  async create(dto: InferInsertModel<typeof PersonEntity>) {
    const [entity] = await this.drizzle
      .insert(PersonEntity)
      .values(dto)
      .returning();
    return entity!;
  }

  async update(dto: { otherInformation?: string }): Promise<void> {
    await this.drizzle.update(PersonEntity).set({
      otherInformation: dto.otherInformation ?? null,
    });
  }
}
