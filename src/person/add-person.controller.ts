import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Body, exception, Exceptions, Response } from '@st-api/core';
import { eq, inArray } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../drizzle-orm.module.js';
import {
  CareerLevelEntity,
  ChapterEntity,
  CustomerEntity,
  PersonEntity,
  PersonSkillEntity,
  PersonSkillInterestEntity,
  SkillEntity,
  SkillLevelEntity,
} from '../schema.js';

import { UpsertPersonDto } from './dto/upsert-person.dto.js';
import {
  CareerLevelNotFound,
  ChapterNotFound,
  CustomerNotFound,
  SkillLevelNotFound,
  SkillNotFound,
} from './exceptions.js';

export const SkillsMustBeUnique = exception({
  message: 'Skills must be unique',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-ADD-0001',
  error: 'body.skills must not have duplicated skillIds',
});

@ApiTags('Person')
@Controller({
  version: '1',
  path: 'upsert',
})
export class AddPersonController {
  constructor(private readonly drizzle: Drizzle) {}

  private async assertSkillsExists(skillIds: number[]): Promise<void> {
    const skills = await this.drizzle
      .select({ id: SkillEntity.id })
      .from(SkillEntity)
      .where(inArray(SkillEntity.id, skillIds));
    const skillIdNotFound = skillIds.find(
      (skillId) => !skills.some((skill) => skill.id === skillId),
    );
    if (skillIdNotFound) {
      throw SkillNotFound(`Skill with id ${skillIdNotFound} not found`);
    }
  }

  private async assertSkillLevelsExists(
    skillLevelIds: number[],
  ): Promise<void> {
    const skillLevels = await this.drizzle
      .select({ id: SkillLevelEntity.id })
      .from(SkillLevelEntity)
      .where(inArray(SkillLevelEntity.id, skillLevelIds));
    const skillLevelIdNotFound = skillLevelIds.find(
      (skillId) => !skillLevels.some((skill) => skill.id === skillId),
    );
    if (skillLevelIdNotFound) {
      throw SkillLevelNotFound(
        `Skill level with id ${skillLevelIdNotFound} not found`,
      );
    }
  }

  private assertSkillsAreUnique(body: UpsertPersonDto): void {
    const skillIds = body.skills.map((skill) => skill.skillId);
    const skillIdsSet = new Set(skillIds);
    if (skillIds.length !== skillIdsSet.size) {
      throw SkillsMustBeUnique();
    }
  }

  private async assertChapterExists(chapterId: number): Promise<void> {
    const [chapter] = await this.drizzle
      .select({ id: ChapterEntity.id })
      .from(ChapterEntity)
      .where(eq(ChapterEntity.id, chapterId));
    if (!chapter) {
      throw ChapterNotFound(`Chapter with id ${chapterId} not found`);
    }
  }

  private async assertCustomerExists(customerId: number): Promise<void> {
    const customer = await this.drizzle
      .select({ id: CustomerEntity.id })
      .from(CustomerEntity)
      .where(eq(CustomerEntity.id, customerId));
    if (!customer) {
      throw CustomerNotFound(`Customer with id ${customerId} not found`);
    }
  }

  private async assertCareerLevelExist(careerLevelId: number): Promise<void> {
    const careerLevel = await this.drizzle
      .select({ id: CareerLevelEntity.id })
      .from(CareerLevelEntity)
      .where(eq(CareerLevelEntity.id, careerLevelId));
    if (!careerLevel) {
      throw CareerLevelNotFound(
        `Career level with id ${careerLevelId} not found`,
      );
    }
  }

  @Exceptions([
    SkillNotFound,
    SkillLevelNotFound,
    SkillsMustBeUnique,
    ChapterNotFound,
    CustomerNotFound,
    CareerLevelNotFound,
  ])
  @Response(z.void())
  @Post()
  async upsert(@Body() body: UpsertPersonDto): Promise<void> {
    this.assertSkillsAreUnique(body);
    await this.assertChapterExists(body.chapterId);
    await this.assertCustomerExists(body.lastCustomerId);
    await this.assertCareerLevelExist(body.careerLevelId);
    await this.assertSkillsExists([
      ...body.skills.map((skill) => skill.skillId),
      ...(body.interests ?? []),
    ]);
    await this.assertSkillLevelsExists([
      ...new Set(body.skills.map((skill) => skill.skillLevelId)),
    ]);

    const [currentPerson] = await this.drizzle
      .select({ id: PersonEntity.id })
      .from(PersonEntity)
      .where(eq(PersonEntity.eid, body.eid));

    await this.drizzle.transaction(async (transaction) => {
      let personId: number;
      if (currentPerson) {
        await transaction
          .delete(PersonSkillEntity)
          .where(eq(PersonSkillEntity.personId, currentPerson.id));
        await transaction
          .delete(PersonSkillInterestEntity)
          .where(eq(PersonSkillInterestEntity.personId, currentPerson.id));
        await transaction.update(PersonEntity).set({
          otherInformation: body.otherInformation ?? null,
          careerLevelId: body.careerLevelId,
          lastCustomerId: body.lastCustomerId,
          chapterId: body.chapterId,
        });
        personId = currentPerson.id;
      } else {
        const [newPerson] = await transaction
          .insert(PersonEntity)
          .values({
            eid: body.eid,
            otherInformation: body.otherInformation,
            lastCustomerId: body.lastCustomerId,
            chapterId: body.chapterId,
            careerLevelId: body.careerLevelId,
          })
          .returning({ id: PersonEntity.id });
        personId = newPerson!.id;
      }

      await transaction.insert(PersonSkillEntity).values(
        body.skills.map((skill) => ({
          skillId: skill.skillId,
          skillLevelId: skill.skillLevelId,
          personId,
        })),
      );

      if (body.interests?.length) {
        await transaction.insert(PersonSkillInterestEntity).values(
          body.interests.map((skillId) => ({
            skillId,
            personId,
          })),
        );
      }
    });
  }
}
