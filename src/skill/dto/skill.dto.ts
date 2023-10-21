import { zodDto } from '@st-api/core';
import { z } from 'zod';

export class SkillDto extends zodDto(
  z.object({
    skillId: z.number(),
    skillName: z.string(),
  }),
) {}
