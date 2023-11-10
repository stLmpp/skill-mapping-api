import { zDto } from '@st-api/core';
import { z } from 'zod';

export class AddJobRoleResponseDto extends zDto(
  z.object({
    id: z.number(),
    name: z.string(),
  }),
) {}
