import { ParamIntSchema, zDto } from '@st-api/core';
import { z } from 'zod';

export class RemovePersonParams extends zDto(
  z.object({
    personId: ParamIntSchema.pipe(z.number().safe().min(1)),
  }),
) {}
