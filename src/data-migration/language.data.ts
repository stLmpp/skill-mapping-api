import { InferInsertModel } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import { LanguageEntity } from '../schema.js';

import { DataMigration } from './data-migration.type.js';

const data: InferInsertModel<typeof LanguageEntity>[] = [
  { name: 'Portugues' },
  { name: 'Ingles' },
  { name: 'Espanhol' },
];

export const languageDataMigration: DataMigration = {
  name: 'language',
  async run(drizzle: BetterSQLite3Database): Promise<void> {
    const [language] = await drizzle
      .select({
        id: LanguageEntity.id,
      })
      .from(LanguageEntity)
      .limit(1);
    if (language) {
      return;
    }
    await drizzle.insert(LanguageEntity).values(data);
  },
};
