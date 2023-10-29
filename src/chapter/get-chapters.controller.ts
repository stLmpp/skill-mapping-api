import { Controller, Get } from '@nestjs/common';
import { ZRes } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';
import { ChapterEntity } from '../schema.js';

import { ChapterDto } from './dto/chapter.dto.js';

@Controller({
  version: '1',
})
export class GetChaptersController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes([ChapterDto])
  @Get()
  async getAll(): Promise<ChapterDto[]> {
    return this.drizzle
      .select({
        chapterId: ChapterEntity.id,
        chapterName: ChapterEntity.name,
      })
      .from(ChapterEntity);
  }
}
