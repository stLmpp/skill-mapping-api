import { careerLevelDataMigration } from './career-level.data.js';
import { DataMigration } from './data-migration.type.js';
import { languageDataMigration } from './language.data.js';
import { skillLevelDataMigration } from './skill-level.data.js';
import { skillDataMigration } from './skill.data.js';

export const DATA_MIGRATIONS: readonly DataMigration[] = [
  skillLevelDataMigration,
  skillDataMigration,
  careerLevelDataMigration,
  languageDataMigration,
];
