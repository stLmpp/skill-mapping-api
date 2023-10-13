import { InferInsertModel } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import { SkillLevelEntity } from '../schema.js';

import { DataMigration } from './data-migration.type.js';

const data: InferInsertModel<typeof SkillLevelEntity>[] = [
  { name: 'Básico' },
  { name: 'Intermediário' },
  { name: 'Avançado' },
];

export const skillLevelDataMigration: DataMigration = {
  name: 'skill-level',
  async run(drizzle: BetterSQLite3Database): Promise<void> {
    const [skillLevel] = await drizzle
      .select({
        id: SkillLevelEntity.id,
      })
      .from(SkillLevelEntity)
      .limit(1);
    if (skillLevel) {
      return;
    }
    await drizzle.insert(SkillLevelEntity).values(data);
  },
};
