import { zDto } from '@st-api/core';
import { z } from 'zod';

export class CareerLevelDto extends zDto(
  z.object({
    careerLevelId: z.number(),
    careerLevelName: z.string(),
  }),
) {}
