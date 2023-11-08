import { Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';

import { Drizzle } from '../../drizzle-orm.module.js';
import {
  CareerLevelEntity,
  ChapterEntity,
  CustomerEntity,
  LanguageEntity,
  PersonEntity,
  PersonLanguageEntity,
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
    const personLanguageSkillLevelAlias = alias(
      LanguageEntity,
      'person_language_skill_level',
    );
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
        skillUpdatedAt: PersonSkillEntity.updatedAt,
        skillCreatedAt: PersonSkillInterestEntity.createdAt,
        interestUpdatedAt: PersonSkillInterestEntity.updatedAt,
        interestCreatedAt: PersonSkillInterestEntity.createdAt,
        languageId: PersonLanguageEntity.languageId,
        languageName: LanguageEntity.name,
        languageSkillLevelId: PersonLanguageEntity.skillLevelId,
        languageSkillLevelName: personLanguageSkillLevelAlias.name,
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
      )
      .leftJoin(
        PersonLanguageEntity,
        eq(PersonLanguageEntity.personId, PersonEntity.id),
      )
      .leftJoin(
        LanguageEntity,
        eq(PersonLanguageEntity.languageId, LanguageEntity.id),
      )
      .leftJoin(
        personLanguageSkillLevelAlias,
        eq(PersonLanguageEntity.skillLevelId, personLanguageSkillLevelAlias.id),
      );

    const object: Record<
      number,
      Omit<PersonDataDto, 'interest' | 'skills' | 'languages'> & {
        skills: Record<number, PersonDataDto['skills'][number]>;
        interests?: Record<number, PersonDataDto['interest'][number]>;
        languages?: Record<number, PersonDataDto['languages'][number]>;
      }
    > = {};
    for (const entity of entities) {
      const possibleDates = [
        entity.updatedAt,
        entity.skillUpdatedAt,
        entity.skillCreatedAt,
        entity.interestCreatedAt,
        entity.interestUpdatedAt,
      ];
      const updatedAt = possibleDates
        .filter((date): date is NonNullable<typeof date> => !!date)
        .reduce(
          (lastDate, date) => (isAfter(date, lastDate) ? date : lastDate),
          entity.createdAt,
        );
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
        updatedAt,
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

      if (
        entity.languageId &&
        entity.languageName &&
        entity.languageSkillLevelId &&
        entity.languageSkillLevelName
      ) {
        person.languages ??= {};
        person.languages[entity.languageId] ??= {
          skillLevelId: entity.languageSkillLevelId,
          languageId: entity.languageId,
          languageName: entity.languageName,
          skillLevelName: entity.languageSkillLevelName,
        };
      }
    }

    return Object.values(object).map((person) => ({
      ...person,
      skills: Object.values(person.skills),
      interest: Object.values(person.interests ?? {}),
      languages: Object.values(person.languages ?? {}),
    }));
  }
}
