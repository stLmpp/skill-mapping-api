import { ParamIntSchema, zodDto } from '@st-api/core';
import { z } from 'zod';

export class AddSkillParams extends zodDto(
  z.object({
    personId: ParamIntSchema.pipe(z.number().min(1)),
    skillId: ParamIntSchema.pipe(z.number().min(1)),
  }),
) {}
