import { InferInsertModel } from 'drizzle-orm';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

import { CareerLevelEntity } from '../schema.js';

import { DataMigration } from './data-migration.type.js';

const data: InferInsertModel<typeof CareerLevelEntity>[] = [
  { name: 'CL13' },
  { name: 'CL12' },
  { name: 'CL11' },
  { name: 'CL10' },
  { name: 'CL9' },
  { name: 'CL8' },
  { name: 'CL7' },
];

export const careerLevelDataMigration: DataMigration = {
  name: 'career-level',
  async run(drizzle: BetterSQLite3Database): Promise<void> {
    const [careerLevel] = await drizzle
      .select({
        id: CareerLevelEntity.id,
      })
      .from(CareerLevelEntity)
      .limit(1);
    if (careerLevel) {
      return;
    }
    await drizzle.insert(CareerLevelEntity).values(data);
  },
};
