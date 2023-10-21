import { zodDto } from '@st-api/core';
import { z } from 'zod';

export class UpdatePersonDto extends zodDto(
  z.object({
    otherInformation: z.string().trim().min(1).max(5000).optional(),
    chapterId: z.number().safe().min(1).optional(),
    lastCustomerId: z.number().safe().min(1).optional(),
    careerLevelId: z.number().safe().min(1).optional(),
  }),
) {}
