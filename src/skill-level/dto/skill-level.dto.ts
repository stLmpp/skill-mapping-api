import { zodDto } from '@assis-delivery/core';
import { z } from 'zod';

export class SkillLevelDto extends zodDto(
  z.object({
    skillLevelId: z.number().positive().safe(),
    skillLevelName: z.string().min(1).max(50),
  }),
) {}
