import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { AddSkillController } from './add-skill/add-skill.controller.js';
import { GetAllPersonXlsxController } from './get-all-person/get-all-person-xlsx.controller.js';
import { GetAllPersonController } from './get-all-person/get-all-person.controller.js';
import { GetAllPersonService } from './get-all-person/get-all-person.service.js';
import { PersonValidationService } from './person-validation.service.js';
import { RemoveSkillController } from './remove-skill/remove-skill.controller.js';
import { UpdatePersonController } from './update-person/update-person.controller.js';
import { UpsertPersonController } from './upsert-person/upsert-person.controller.js';

@Module({
  imports: [DrizzleOrmModule, ConfigModule],
  controllers: [
    UpsertPersonController,
    GetAllPersonController,
    GetAllPersonXlsxController,
    UpdatePersonController,
    AddSkillController,
    RemoveSkillController,
  ],
  providers: [GetAllPersonService, PersonValidationService],
})
export class PersonModule {}
