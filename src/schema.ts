import {
  index,
  int,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const PersonEntity = sqliteTable(
  'person',
  {
    id: int('id').primaryKey({ autoIncrement: true }),
    eid: text('eid', { length: 255 })
      .notNull()
      .unique('person_eid_unique_index'),
    careerLevelId: int('career_level_id')
      .notNull()
      .references(() => CareerLevelEntity.id),
    chapterId: int('chapter_id')
      .notNull()
      .references(() => ChapterEntity.id),
    lastCustomerId: int('last_customer_id')
      .notNull()
      .references(() => CustomerEntity.id),
    otherInformation: text('other_information', { length: 5000 }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    careerLevelIdIndex: index('person_career_level_id_index').on(
      table.careerLevelId,
    ),
    chapterIdIndex: index('person_chapter_id_index').on(table.chapterId),
    lastCustomerIdIndex: index('person_customer_id_index').on(
      table.lastCustomerId,
    ),
  }),
);

export const CustomerEntity = sqliteTable('customer', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 255 }).notNull(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const CareerLevelEntity = sqliteTable('career_level', {
  id: int('id').primaryKey({ autoIncrement: true }),
  name: text('name', { length: 10 }).notNull(),
  createdAt: int('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const ChapterEntity = sqliteTable('chapter', {
  id: int('id').primaryKey(),
  name: text('name', { length: 255 }).notNull(),
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
    personSkillUniqueIndex: uniqueIndex('person_skill_unique_index').on(
      table.personId,
      table.skillId,
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
