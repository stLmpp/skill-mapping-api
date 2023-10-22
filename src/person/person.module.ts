import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { AddPersonController } from './add-person.controller.js';
import { GetAllPersonXlsxController } from './get-all-person-xlsx.controller.js';
import { GetAllPersonController } from './get-all-person.controller.js';
import { GetAllPersonService } from './get-all-person.service.js';
import { PersonValidationService } from './person-validation.service.js';
import { UpdatePersonController } from './update-person.controller.js';

@Module({
  imports: [DrizzleOrmModule, ConfigModule],
  controllers: [
    AddPersonController,
    GetAllPersonController,
    GetAllPersonXlsxController,
    UpdatePersonController,
  ],
  providers: [GetAllPersonService, PersonValidationService],
})
export class PersonModule {}
