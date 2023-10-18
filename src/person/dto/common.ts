import { extendApi } from '@assis-delivery/core';
import { z } from 'zod';

const EIDPattern = '^[.az]{1,255}$';

export const EIDSchema = extendApi(
  z
    .string()
    .trim()
    .min(1)
    .max(255)
    .regex(new RegExp(EIDPattern), `Must follow the pattern ${EIDPattern}`),
  {
    example: 'john.doe',
  },
);
