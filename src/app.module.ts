import { CoreModule } from '@assis-delivery/core';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { DrizzleOrmModule } from './drizzle-orm.module.js';
import { PersonModule } from './person/person.module.js';

@Module({
  imports: [
    CoreModule.forRoot(),
    DrizzleOrmModule,
    RouterModule.register([
      {
        module: PersonModule,
        path: 'person',
      },
    ]),
    PersonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
