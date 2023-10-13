import { zodDto } from '@assis-delivery/core';
import { z } from 'zod';

export class PersonDataDto extends zodDto(
  z.object({
    personId: z.number(),
    pid: z.string().min(1).max(30),
    otherInformation: z.string().min(1).max(5000).optional(),
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
