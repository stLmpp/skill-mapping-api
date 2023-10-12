import { Injectable } from '@nestjs/common';
import { inArray } from 'drizzle-orm';

import { Drizzle } from '../drizzle-orm.module.js';
import { SkillLevelEntity } from '../schema.js';

@Injectable()
export class SkillLevelRepository {
  constructor(private readonly drizzle: Drizzle) {}

  async findByIds(skillLevelIds: number[]) {
    return this.drizzle
      .select()
      .from(SkillLevelEntity)
      .where(inArray(SkillLevelEntity.id, skillLevelIds));
  }
}
