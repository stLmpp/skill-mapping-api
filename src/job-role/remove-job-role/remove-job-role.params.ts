import { ParamIntSchema, zDto } from '@st-api/core';
import { z } from 'zod';

export class RemoveJobRoleParams extends zDto(
  z.object({
    jobRoleId: ParamIntSchema.pipe(z.number().safe().min(1)),
  }),
) {}
