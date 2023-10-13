import { zodDto } from '@assis-delivery/core';
import { z } from 'zod';

export class PersonFileFormatParams extends zodDto(
  z.object({
    format: z.enum(['xlsx']),
  }),
) {}
