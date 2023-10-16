import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { AddPersonController } from './add-person.controller.js';
import { GetAllPersonXlsxController } from './get-all-person-xlsx.controller.js';
import { GetAllPersonController } from './get-all-person.controller.js';
import { GetAllPersonService } from './get-all-person.service.js';

@Module({
  imports: [DrizzleOrmModule],
  controllers: [
    AddPersonController,
    GetAllPersonController,
    GetAllPersonXlsxController,
  ],
  providers: [GetAllPersonService],
})
export class PersonModule {}
