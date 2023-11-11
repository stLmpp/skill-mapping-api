import { InferInsertModel } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import { JobRoleEntity } from '../schema.js';

import { DataMigration } from './data-migration.type.js';

const data: InferInsertModel<typeof JobRoleEntity>[] = [
  { name: 'Desenvolvedor' },
  { name: 'Tech lead' },
  { name: 'Scrum master' },
];

export const jobRoleDataMigration: DataMigration = {
  name: 'language',
  async run(drizzle: BetterSQLite3Database): Promise<void> {
    const [language] = await drizzle
      .select({
        id: JobRoleEntity.id,
      })
      .from(JobRoleEntity)
      .limit(1);
    if (language) {
      return;
    }
    await drizzle.insert(JobRoleEntity).values(data);
  },
};
