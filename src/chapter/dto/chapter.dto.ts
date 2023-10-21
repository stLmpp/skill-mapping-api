import { zodDto } from '@st-api/core';
import { z } from 'zod';

export class ChapterDto extends zodDto(
  z.object({
    chapterId: z.number(),
    chapterName: z.string(),
  }),
) {}
