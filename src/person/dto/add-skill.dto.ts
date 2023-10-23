import { zodDto } from '@st-api/core';
import { z } from 'zod';

export class AddSkillDto extends zodDto(
  z.object({
    skillLevelId: z.number().safe().min(1),
  }),
) {}
