import { InferInsertModel } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import { SkillEntity } from '../schema.js';

import { DataMigration } from './data-migration.type.js';

const data: InferInsertModel<typeof SkillEntity>[] = [
  { name: 'Angular' },
  { name: 'NestJS' },
  { name: 'React' },
];

export const skillDataMigration: DataMigration = {
  name: 'skill-level',
  async run(drizzle: BetterSQLite3Database): Promise<void> {
    const [skill] = await drizzle
      .select({
        id: SkillEntity.id,
      })
      .from(SkillEntity)
      .limit(1);
    if (skill) {
      return;
    }
    await drizzle.insert(SkillEntity).values(data);
  },
};
