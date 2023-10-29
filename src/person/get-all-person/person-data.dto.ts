import { zDto } from '@st-api/core';
import { z } from 'zod';

export class PersonDataDto extends zDto(
  z.object({
    personId: z.number(),
    eid: z.string(),
    otherInformation: z.string().optional(),
    lastCustomerId: z.number(),
    lastCustomerName: z.string(),
    chapterId: z.number(),
    chapterName: z.string(),
    careerLevelId: z.number(),
    careerLevelName: z.string(),
    updatedAt: z.date(),
    skills: z.array(
      z.object({
        skillId: z.number(),
        skillName: z.string(),
        skillLevelId: z.number(),
        skillLevelName: z.string(),
      }),
    ),
    interest: z.array(
      z.object({
        skillId: z.number(),
        skillName: z.string(),
      }),
    ),
  }),
) {}