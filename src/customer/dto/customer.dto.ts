import { zodDto } from '@st-api/core';
import { z } from 'zod';

export class CustomerDto extends zodDto(
  z.object({
    customerId: z.number(),
    customerName: z.string(),
  }),
) {}
