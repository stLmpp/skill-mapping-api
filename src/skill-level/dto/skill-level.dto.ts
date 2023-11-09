import { zDto } from '@st-api/core';
import { z } from 'zod';

export class SkillLevelDto extends zDto(
  z.object({
    skillLevelId: z.number(),
    skillLevelName: z.string(),
    skillLevelDescription: z.string().optional(),
  }),
) {}
