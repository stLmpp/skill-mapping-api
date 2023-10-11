import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import { Config } from 'drizzle-kit';

const path = join(homedir(), 'skill-mapping');
if (!existsSync(path)) {
  mkdirSync(path);
}
const url = join(path, 'data.db');

export default {
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url,
  },
  schema: './src/schema/*.ts',
} satisfies Config;
