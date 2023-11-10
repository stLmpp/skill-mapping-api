import { Controller, Delete } from '@nestjs/common';
import { ZParams, ZRes } from '@st-api/core';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { Drizzle } from '../../drizzle-orm.module.js';
import { JobRoleEntity } from '../../schema.js';

import { RemoveJobRoleParams } from './remove-job-role.params.js';

@Controller({
  version: '1',
  path: ':jobRoleId',
})
export class RemoveJobRoleController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes(z.void())
  @Delete()
  async removeJobRole(
    @ZParams() { jobRoleId }: RemoveJobRoleParams,
  ): Promise<void> {
    await this.drizzle
      .delete(JobRoleEntity)
      .where(eq(JobRoleEntity.id, jobRoleId));
  }
}
