import { zDto } from '@st-api/core';
import { z } from 'zod';

export class AddSkillDto extends zDto(
  z.object({
    skillLevelId: z.number().safe().min(1),
  }),
) {}
