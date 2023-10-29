import { ParamIntSchema, zDto } from '@st-api/core';
import { z } from 'zod';

export class RemoveSkillParams extends zDto(
  z.object({
    personId: ParamIntSchema.pipe(z.number().min(1)),
    skillId: ParamIntSchema.pipe(z.number().min(1)),
  }),
) {}
