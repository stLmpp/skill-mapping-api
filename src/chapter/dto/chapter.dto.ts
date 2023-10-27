import { zDto } from '@st-api/core';
import { z } from 'zod';

export class ChapterDto extends zDto(
  z.object({
    chapterId: z.number(),
    chapterName: z.string(),
  }),
) {}
