import { zDto } from '@st-api/core';
import { z } from 'zod';

export class AddJobRoleDto extends zDto(
  z.object({
    name: z.string().trim().min(1).max(255).openapi({
      example: 'Developer',
    }),
  }),
) {}
