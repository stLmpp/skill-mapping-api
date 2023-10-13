import { zodDto } from '@assis-delivery/core';
import { z } from 'zod';

export class UpsertPersonDto extends zodDto(
  z.object({
    pid: z.string().trim().min(1).max(30),
    otherInformation: z.string().max(5000).optional(),
    skills: z
      .array(
        z.object({
          skillId: z.number().positive().safe(),
          skillLevelId: z.number().positive().safe(),
        }),
      )
      .min(1),
    interests: z.array(z.number().positive().safe()).optional(),
  }),
) {}
