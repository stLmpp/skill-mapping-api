import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';

import { Drizzle } from '../../drizzle-orm.module.js';
import {
  CareerLevelEntity,
  ChapterEntity,
  CustomerEntity,
  PersonEntity,
  PersonSkillEntity,
  PersonSkillInterestEntity,
  SkillEntity,
  SkillLevelEntity,
} from '../../schema.js';

import { PersonDataDto } from './person-data.dto.js';

@Injectable()
export class GetAllPersonService {
  constructor(private readonly drizzle: Drizzle) {}

  async getAll(): Promise<PersonDataDto[]> {
    const personSkillInterestSkillAlias = alias(SkillEntity, 'skill_interest');
    const entities = await this.drizzle
      .select({
        eid: PersonEntity.eid,
        personId: PersonEntity.id,
        otherInformation: PersonEntity.otherInformation,
        careerLevelId: PersonEntity.careerLevelId,
        careerLevelName: CareerLevelEntity.name,
        chapterId: PersonEntity.chapterId,
        chapterName: ChapterEntity.name,
        lastCustomerId: PersonEntity.lastCustomerId,
        lastCustomerName: CustomerEntity.name,
        skillId: SkillEntity.id,
        skillName: SkillEntity.name,
        personSkillId: PersonSkillEntity.id,
        skillLevelId: SkillLevelEntity.id,
        skillLevelName: SkillLevelEntity.name,
        interestSkillId: personSkillInterestSkillAlias.id,
        interestSkillName: personSkillInterestSkillAlias.name,
        interestId: PersonSkillInterestEntity.id,
        updatedAt: PersonEntity.updatedAt,
        createdAt: PersonEntity.createdAt,
      })
      .from(PersonEntity)
      .leftJoin(
        PersonSkillEntity,
        eq(PersonEntity.id, PersonSkillEntity.personId),
      )
      .leftJoin(SkillEntity, eq(PersonSkillEntity.skillId, SkillEntity.id))
      .leftJoin(
        SkillLevelEntity,
        eq(PersonSkillEntity.skillLevelId, SkillLevelEntity.id),
      )
      .innerJoin(
        CareerLevelEntity,
        eq(CareerLevelEntity.id, PersonEntity.careerLevelId),
      )
      .innerJoin(ChapterEntity, eq(ChapterEntity.id, PersonEntity.chapterId))
      .innerJoin(
        CustomerEntity,
        eq(CustomerEntity.id, PersonEntity.lastCustomerId),
      )
      .leftJoin(
        PersonSkillInterestEntity,
        eq(PersonEntity.id, PersonSkillInterestEntity.personId),
      )
      .leftJoin(
        personSkillInterestSkillAlias,
        eq(personSkillInterestSkillAlias.id, PersonSkillInterestEntity.skillId),
      );
    const object: Record<
      number,
      Omit<PersonDataDto, 'interest' | 'skills'> & {
        skills: Record<number, PersonDataDto['skills'][number]>;
        interests?: Record<number, PersonDataDto['interest'][number]>;
      }
    > = {};
    for (const entity of entities) {
      const person = (object[entity.personId] ??= {
        skills: {},
        personId: entity.personId,
        eid: entity.eid,
        otherInformation: entity.otherInformation ?? undefined,
        careerLevelId: entity.careerLevelId,
        careerLevelName: entity.careerLevelName,
        chapterId: entity.chapterId,
        chapterName: entity.chapterName,
        lastCustomerId: entity.lastCustomerId,
        lastCustomerName: entity.lastCustomerName,
        updatedAt: entity.updatedAt ?? entity.createdAt,
      });
      if (
        entity.personSkillId &&
        entity.skillId &&
        entity.skillLevelId &&
        entity.skillName &&
        entity.skillLevelName
      ) {
        person.skills[entity.personSkillId] ??= {
          skillId: entity.skillId,
          skillLevelId: entity.skillLevelId,
          skillName: entity.skillName,
          skillLevelName: entity.skillLevelName,
        };
      }

      if (
        entity.interestId &&
        entity.interestSkillId &&
        entity.interestSkillName
      ) {
        person.interests ??= {};
        person.interests[entity.interestId] ??= {
          skillId: entity.interestSkillId,
          skillName: entity.interestSkillName,
        };
      }
    }
    return Object.values(object).map((person) => ({
      ...person,
      skills: Object.values(person.skills),
      interest: Object.values(person.interests ?? {}),
    }));
  }
}
