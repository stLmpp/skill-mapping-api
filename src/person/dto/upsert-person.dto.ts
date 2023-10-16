import { extendApi, zodDto } from '@assis-delivery/core';
import { z } from 'zod';

const EIDPattern = '^[.az]{1,255}$';

export class UpsertPersonDto extends zodDto(
  z.object({
    eid: extendApi(
      z
        .string()
        .trim()
        .min(1)
        .max(255)
        .regex(new RegExp(EIDPattern), `Must follow the pattern ${EIDPattern}`),
      {
        example: 'john.doe',
      },
    ),
    otherInformation: z
      .string()
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
