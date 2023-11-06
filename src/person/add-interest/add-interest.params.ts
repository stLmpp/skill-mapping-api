import { ParamIntSchema, zDto } from '@st-api/core';
import { z } from 'zod';

export class AddInterestParams extends zDto(
  z.object({
    personId: ParamIntSchema.pipe(z.number().safe().min(1)),
    skillId: ParamIntSchema.pipe(z.number().safe().min(1)),
  }),
) {}
