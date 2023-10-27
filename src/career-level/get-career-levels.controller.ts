import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZRes } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';
import { CareerLevelEntity } from '../schema.js';

import { CareerLevelDto } from './dto/career-level.dto.js';

@ApiTags('Career level')
@Controller({
  version: '1',
})
export class GetCareerLevelsController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes([CareerLevelDto])
  @Get()
  async getAll(): Promise<CareerLevelDto[]> {
    return this.drizzle
      .select({
        careerLevelId: CareerLevelEntity.id,
        careerLevelName: CareerLevelEntity.name,
      })
      .from(CareerLevelEntity);
  }
}
