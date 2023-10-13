import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export interface DataMigration {
  readonly name: string;
  run(drizzle: BetterSQLite3Database): Promise<void>;
}
