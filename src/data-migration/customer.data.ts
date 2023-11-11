import { InferInsertModel } from 'drizzle-orm';
import { CustomerEntity } from '../schema.js';
import { DataMigration } from './data-migration.type.js';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

const data: InferInsertModel<typeof CustomerEntity>[] = [
  { name: 'BRK' },
  { name: 'Pefisa' },
];

export const customerDataMigration: DataMigration = {
  name: 'customer',
  async run(drizzle: BetterSQLite3Database): Promise<void> {
    const [customer] = await drizzle
      .select({
        id: CustomerEntity.id,
      })
      .from(CustomerEntity)
      .limit(1);
    if (customer) {
      return;
    }
    await drizzle.insert(CustomerEntity).values(data);
  },
};
