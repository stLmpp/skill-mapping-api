import { Body, Exceptions, Response } from '@assis-delivery/core';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { z } from 'zod';

import { PersonSkillRepository } from '../person-skill/person-skill.repository.js';
import { SkillRepository } from '../skill/skill.repository.js';
import { SkillLevelRepository } from '../skill-level/skill-level.repository.js';

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
      ]);
    }

    const person =
      currentPerson ??
      (await this.personRepository.create({
        pid: body.pid,
        otherInformation: body.otherInformation,
      }));

    if (!body.skills.length) {
      return;
    }

    await this.personSkillRepository.createMany(
      body.skills.map((skill) => ({
        skillId: skill.skillId,
        skillLevelId: skill.skillLevelId,
        personId: person.id,
      })),
    );
  }
}
