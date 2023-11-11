import { Controller, Get } from '@nestjs/common';
import { ZRes } from '@st-api/core';

import { Drizzle } from '../../drizzle-orm.module.js';
import { LanguageEntity } from '../../schema.js';

import { LanguageDto } from './language.dto.js';

@Controller({
  version: '1',
})
export class GetAllLanguagesController {
  constructor(private readonly drizzle: Drizzle) {}

  @ZRes([LanguageDto])
  @Get()
  async getAll(): Promise<LanguageDto[]> {
    return this.drizzle
      .select({
        languageId: LanguageEntity.id,
        languageName: LanguageEntity.name,
      })
      .from(LanguageEntity);
  }
}
