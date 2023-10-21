import { ParamIntSchema, zodDto } from '@st-api/core';
import { z } from 'zod';

import { EIDSchema } from './common.js';

export class UpdatePersonByIdParams extends zodDto(
  z.object({
    personId: ParamIntSchema,
  }),
) {}

export class UpdatePersonByEidParams extends zodDto(
  z.object({
    eid: EIDSchema,
  }),
) {}
