import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { Module } from '@nestjs/common';
import Database from 'better-sqlite3';
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import { getClazz } from './util/get-clazz.js';

export class Drizzle extends getClazz<BetterSQLite3Database>() {}

const path = join(homedir(), 'skill-mapping');

if (!existsSync(path)) {
  mkdirSync(path);
}
const database = new Database(join(path, 'data.db'));
const drizzleDatabase = drizzle(database);
migrate(drizzleDatabase, { migrationsFolder: './drizzle' });

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
