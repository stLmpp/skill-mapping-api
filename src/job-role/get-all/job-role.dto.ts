import { zDto } from '@st-api/core';
import { z } from 'zod';

export class JobRoleDto extends zDto(
  z.object({
    jobRoleId: z.number(),
    jobRoleName: z.string(),
  }),
) {}
