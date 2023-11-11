import { zDto } from '@st-api/core';
import { z } from 'zod';

export class LanguageDto extends zDto(
  z.object({
    languageId: z.number(),
    languageName: z.string(),
  }),
) {}
