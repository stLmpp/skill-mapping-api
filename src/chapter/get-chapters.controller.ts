import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';
import { ChapterEntity } from '../schema.js';

import { ChapterDto } from './dto/chapter.dto.js';

@ApiTags('Chapter')
@Controller({
  version: '1',
})
export class GetChaptersController {
  constructor(private readonly drizzle: Drizzle) {}

  @Response([ChapterDto])
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
