import { Controller, Get } from '@nestjs/common';
import { ZRes } from '@st-api/core';

import { Drizzle } from '../../drizzle-orm.module.js';
import { JobRoleEntity } from '../../schema.js';

import { JobRoleDto } from './job-role.dto.js';

@Controller({
  version: '1',
})
export class GetAllController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes([JobRoleDto])
  @Get()
  async getAll(): Promise<JobRoleDto[]> {
    return this.drizzle
      .select({
        jobRoleId: JobRoleEntity.id,
        jobRoleName: JobRoleEntity.name,
      })
      .from(JobRoleEntity);
  }
}
