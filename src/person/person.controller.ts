import { Body, Exceptions, Params, Response } from '@assis-delivery/core';
import { Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response as ExpressResponse } from 'express';
import { z } from 'zod';

import { PersonSkillRepository } from '../person-skill/person-skill.repository.js';
import { PersonSkillInterestRepository } from '../person-skill-interest/person-skill-interest.repository.js';
import { SkillRepository } from '../skill/skill.repository.js';
import { SkillLevelRepository } from '../skill-level/skill-level.repository.js';

import { PersonDataDto } from './dto/person-data.dto.js';
import { PersonFileFormatParams } from './dto/person-file-format.params.js';
import { UpsertPersonDto } from './dto/upsert-person.dto.js';
import {
  SkillLevelNotFound,
  SkillNotFound,
  SkillsMustBeUnique,
} from './exceptions.js';
import { PersonRepository } from './person.repository.js';

@ApiTags('Person')
@Controller({
  version: '1',
})
export class PersonController {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly personSkillRepository: PersonSkillRepository,
    private readonly skillRepository: SkillRepository,
    private readonly skillLevelRepository: SkillLevelRepository,
    private readonly personSkillInterestRepository: PersonSkillInterestRepository,
  ) {}

  private async assertSkillsExists(skillIds: number[]): Promise<void> {
    const skills = await this.skillRepository.findByIds(skillIds);
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
    const skillLevels =
      await this.skillLevelRepository.findByIds(skillLevelIds);
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

  @Exceptions([SkillNotFound, SkillLevelNotFound, SkillsMustBeUnique])
  @Response(z.void())
  @Post('upsert')
  async upsert(@Body() body: UpsertPersonDto): Promise<void> {
    this.assertSkillsAreUnique(body);
    await this.assertSkillsExists(body.skills.map((skill) => skill.skillId));
    await this.assertSkillLevelsExists([
      ...new Set(body.skills.map((skill) => skill.skillLevelId)),
    ]);

    const currentPerson = await this.personRepository.findByPid(body.pid);
    if (currentPerson) {
      await Promise.all([
        this.personSkillRepository.deleteByPersonId(currentPerson.id),
        this.personRepository.update({
          otherInformation: body.otherInformation,
        }),
        this.personSkillInterestRepository.deleteByPersonId(currentPerson.id),
      ]);
    }

    const person =
      currentPerson ??
      (await this.personRepository.create({
        pid: body.pid,
        otherInformation: body.otherInformation,
      }));

    const promises: Promise<unknown>[] = [
      this.personSkillRepository.createMany(
        body.skills.map((skill) => ({
          skillId: skill.skillId,
          skillLevelId: skill.skillLevelId,
          personId: person.id,
        })),
      ),
    ];

    if (body.interests?.length) {
      promises.push(
        this.personSkillInterestRepository.createMany(
          body.interests.map((skillId) => ({
            skillId,
            personId: person.id,
          })),
        ),
      );
    }

    await Promise.all(promises);
  }

  @Response([PersonDataDto])
  @Get()
  async getAll(): Promise<PersonDataDto[]> {
    const entities = await this.personRepository.findWithAllRelations();
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
        pid: entity.pid,
        otherInformation: entity.otherInformation ?? undefined,
      });
      person.skills[entity.personSkillId] ??= {
        skillId: entity.skillId,
        skillLevelId: entity.skillLevelId,
        skillName: entity.skillName,
        skillLevelName: entity.skillLevelName,
      };
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

  @Get('file/xlsx')
  async getFile(@Res() response: ExpressResponse) {
    response.contentType(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    // TODO implement
  }
}
