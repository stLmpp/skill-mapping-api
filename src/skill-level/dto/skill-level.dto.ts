import { zodDto } from '@assis-delivery/core';
import { z } from 'zod';

export class SkillLevelDto extends zodDto(
  z.object({
    skillLevelId: z.number(),
    skillLevelName: z.string(),
  }),
) {}
