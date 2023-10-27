import { ParamIntSchema, zDto } from '@st-api/core';
import { z } from 'zod';

import { EIDSchema } from './common.js';

export class UpdatePersonByIdParams extends zDto(
  z.object({
    personId: ParamIntSchema,
  }),
) {}

export class UpdatePersonByEidParams extends zDto(
  z.object({
    eid: EIDSchema,
  }),
) {}
