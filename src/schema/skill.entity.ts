import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const SkillEntity = sqliteTable('skill', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 255 }).notNull(),
  createdAt: int('created_at', { mode: 'timestamp' }).$defaultFn(
    () => new Date(),
  ),
});
