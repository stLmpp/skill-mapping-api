import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { Logger, Module } from '@nestjs/common';
import Database from 'better-sqlite3';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { DATA_MIGRATIONS } from './data-migration/index.js';
import { getClazz } from './util/get-clazz.js';

export class Drizzle extends getClazz<BetterSQLite3Database>() {}

export const DATABASE_PATH = join(homedir(), 'skill-mapping');

if (!existsSync(DATABASE_PATH)) {
  mkdirSync(DATABASE_PATH);
}

const database = new Database(join(DATABASE_PATH, 'data.db'));
const drizzleDatabase = drizzle(database, {
  logger: true,
});
migrate(drizzleDatabase, { migrationsFolder: './drizzle' });
for (const migration of DATA_MIGRATIONS) {
  migration
    .run(drizzleDatabase)
    .then(() => {
      Logger.log(
        `Migration ${migration.name} run successfully`,
        'Data migration',
      );
    })
    .catch((error) => {
      Logger.error(
        `Error while running migration ${migration.name}: ${JSON.stringify({
          error,
          errorString: String(error),
        })}`,
        'Data migration',
      );
    });
}

@Module({
  providers: [
    {
      provide: Drizzle,
      useValue: drizzleDatabase,
    },
  ],
  exports: [Drizzle],
})
export class DrizzleOrmModule {}
