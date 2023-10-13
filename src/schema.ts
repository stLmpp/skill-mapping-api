import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const PersonEntity = sqliteTable('person', {
  id: int('id').primaryKey({ autoIncrement: true }),
  pid: text('pid', { length: 30 }).notNull().unique('person_pid_unique_index'),
  otherInformation: text('other_information', { length: 5000 }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const SkillEntity = sqliteTable('skill', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 255 }).notNull(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const SkillLevelEntity = sqliteTable('skill_level', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 255 }).notNull(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const PersonSkillEntity = sqliteTable(
  'person_skill',
  {
    id: int('id').primaryKey({ autoIncrement: true }),
    personId: int('person_id')
      .notNull()
      .references(() => PersonEntity.id),
    skillId: int('skill_id')
      .notNull()
      .references(() => SkillEntity.id),
    skillLevelId: int('skill_level_id')
      .notNull()
      .references(() => SkillLevelEntity.id),
    createdAt: int('created_at', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    personIdIndex: index('person_skill_person_id_index').on(table.personId),
    skillIdIndex: index('person_skill_skill_id_index').on(table.skillId),
    skillLevelIdIndex: index('person_skill_skill_level_id_index').on(
      table.skillLevelId,
    ),
  }),
);

export const PersonSkillInterestEntity = sqliteTable(
  'person_skill_interest',
  {
    id: int('id').primaryKey({ autoIncrement: true }),
    personId: int('person_id')
      .notNull()
      .references(() => PersonEntity.id),
    skillId: int('skill_id')
      .notNull()
      .references(() => SkillEntity.id),
    createdAt: int('created_at', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    personIdIndex: index('person_skill_interest_person_id_index').on(
      table.personId,
    ),
    skillIdIndex: index('person_skill_interest_skill_id_index').on(
      table.skillId,
    ),
  }),
);
