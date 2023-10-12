import { Injectable } from '@nestjs/common';
import { inArray } from 'drizzle-orm';

import { Drizzle } from '../drizzle-orm.module.js';
import { SkillEntity } from '../schema.js';

@Injectable()
export class SkillRepository {
  constructor(private readonly drizzle: Drizzle) {}

  async findByIds(skillIds: number[]) {
    return this.drizzle
      .select()
      .from(SkillEntity)
      .where(inArray(SkillEntity.id, skillIds));
  }
}
