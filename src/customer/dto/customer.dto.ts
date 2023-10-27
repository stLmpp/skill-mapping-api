import { zDto } from '@st-api/core';
import { z } from 'zod';

export class CustomerDto extends zDto(
  z.object({
    customerId: z.number(),
    customerName: z.string(),
  }),
) {}
