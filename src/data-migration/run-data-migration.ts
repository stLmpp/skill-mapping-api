import { Logger } from '@nestjs/common';
import { safeAsync } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';

import { DATA_MIGRATIONS } from './index.js';

const dataMigrationLogger = new Logger('Data migration');

export async function runDataMigration(drizzle: Drizzle) {
  await Promise.all(
    DATA_MIGRATIONS.map(async (migration) => {
      const [error] = await safeAsync(() => migration.run(drizzle));
      if (error) {
        dataMigrationLogger.error(
          `Error while running migration ${migration.name}: ${JSON.stringify({
            error,
            errorString: String(error),
          })}`,
        );
      } else {
        dataMigrationLogger.debug(
          `Migration ${migration.name} run successfully`,
        );
      }
    }),
  );
}
