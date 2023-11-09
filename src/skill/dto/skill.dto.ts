import { zDto } from '@st-api/core';
import { z } from 'zod';

export class SkillDto extends zDto(
  z.object({
    skillId: z.number(),
    skillName: z.string(),
    skillDescription: z.string().optional(),
  }),
) {}
