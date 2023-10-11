import { sqliteTable, int, text } from 'drizzle-orm/sqlite-core';

export const PersonEntity = sqliteTable('person', {
  id: int('id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  pid: text('pid', { length: 30 }),
  createdAt: int('created_at', { mode: 'timestamp' }).$defaultFn(
    () => new Date(),
  ),
});
