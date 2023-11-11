import { InferInsertModel } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import { ChapterEntity } from '../schema.js';

import { DataMigration } from './data-migration.type.js';

const data: InferInsertModel<typeof ChapterEntity>[] = [{ name: 'Channels' }];

export const chapterDataMigration: DataMigration = {
  name: 'chapter',
  async run(drizzle: BetterSQLite3Database): Promise<void> {
    const [language] = await drizzle
      .select({
        id: ChapterEntity.id,
      })
      .from(ChapterEntity)
      .limit(1);
    if (language) {
      return;
    }
    await drizzle.insert(ChapterEntity).values(data);
  },
};
