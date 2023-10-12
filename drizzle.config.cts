import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import type { Config } from 'drizzle-kit';
import { homedir } from 'node:os';

export const DATABASE_PATH = join(homedir(), 'skill-mapping');

if (!existsSync(DATABASE_PATH)) {
  mkdirSync(DATABASE_PATH);
}

const url = join(DATABASE_PATH, 'data.db');

export default {
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url,
  },
  schema: './dist/migrations/schema.js',
} satisfies Config;
