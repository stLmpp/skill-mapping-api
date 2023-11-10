import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ZBody, ZRes } from '@st-api/core';

import { Drizzle } from '../../drizzle-orm.module.js';
import { JobRoleEntity } from '../../schema.js';

import { AddJobRoleResponseDto } from './add-job-role-response.dto.js';
import { AddJobRoleDto } from './add-job-role.dto.js';

@Controller({
  version: '1',
})
export class AddJobRoleController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes(AddJobRoleResponseDto, HttpStatus.CREATED)
  @Post()
  async addJobRole(
    @ZBody() { name }: AddJobRoleDto,
  ): Promise<AddJobRoleResponseDto> {
    const [entity] = await this.drizzle
      .insert(JobRoleEntity)
      .values({
        name,
      })
      .returning();
    return {
      name: entity!.name,
      id: entity!.id,
    };
  }
}
