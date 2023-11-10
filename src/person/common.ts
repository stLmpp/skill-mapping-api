import { z } from 'zod';

const EIDPattern = '^[.a-z]{1,255}$';

export const EIDSchema = z
  .string()
  .trim()
  .min(1)
  .max(255)
  .regex(new RegExp(EIDPattern), `Must follow the pattern ${EIDPattern}`)
  .openapi({
    example: 'john.doe',
  });
