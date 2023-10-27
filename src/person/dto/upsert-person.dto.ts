import { zDto } from '@st-api/core';
import { z } from 'zod';

import { EIDSchema } from './common.js';

export class UpsertPersonDto extends zDto(
  z.object({
    eid: EIDSchema,
    otherInformation: z
      .string()
      .trim()
      .max(5000)
      .optional()
      .describe('Free field to describe other information'),
    lastCustomerId: z.number().safe().min(1),
    chapterId: z.number().safe().min(1),
    careerLevelId: z.number().safe().min(1),
    skills: z
      .array(
        z.object({
          skillId: z.number().safe().min(1),
          skillLevelId: z.number().safe().min(1),
        }),
      )
      .min(1),
    interests: z.array(z.number().safe().min(1)).optional(),
  }),
) {}
