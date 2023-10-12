import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const PersonEntity = sqliteTable('person', {
  id: int('id', { mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  pid: text('pid', { length: 30 }).unique(),
  otherInformation: text('other_information', { length: 5000 }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const SkillEntity = sqliteTable('skill', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 255 }).notNull(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const SkillLevelEntity = sqliteTable('skill_level', {
  id: int('id', {
    mode: 'number',
  }).primaryKey({
    autoIncrement: true,
  }),
  name: text('name', {
    length: 255,
  }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const PersonSkillEntity = sqliteTable(
  'person_skill',
  {
    id: int('id').primaryKey({ autoIncrement: true }),
    personId: int('person_id').references(() => PersonEntity.id),
    skillId: int('skill_id').references(() => SkillEntity.id),
    skillLevelId: int('skill_level_int').references(() => SkillLevelEntity.id),
    createdAt: int('created_at', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    personIdIndex: index('person_id_index').on(table.personId),
    skillIdIndex: index('skill_id_index').on(table.skillId),
    skillLevelIdIndex: index('skill_level_id_index').on(table.skillLevelId),
  }),
);
