import { zodDto } from '@st-api/core';
import { z } from 'zod';

export class SkillLevelDto extends zodDto(
  z.object({
    skillLevelId: z.number(),
    skillLevelName: z.string(),
  }),
) {}
