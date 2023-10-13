import { Response } from '@assis-delivery/core';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkillLevelDto } from './dto/skill-level.dto.js';
import { SkillLevelRepository } from './skill-level.repository.js';

@ApiTags('Skill level')
@Controller({
  version: '1',
})
export class SkillLevelController {
  constructor(private readonly skillLevelRepository: SkillLevelRepository) {}

  @Response([SkillLevelDto])
  @Get()
  async get(): Promise<SkillLevelDto[]> {
    const entities = await this.skillLevelRepository.find();
    return entities.map((entity) => ({
      skillLevelId: entity.id,
      skillLevelName: entity.name,
    }));
  }
}
