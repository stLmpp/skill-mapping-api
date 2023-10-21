import { zodDto } from '@st-api/core';
import { z } from 'zod';

export class CareerLevelDto extends zodDto(
  z.object({
    careerLevelId: z.number(),
    careerLevelName: z.string(),
  }),
) {}
