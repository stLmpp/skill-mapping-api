import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { AddJobRoleController } from './add-job-role/add-job-role.controller.js';
import { GetAllController } from './get-all/get-all.controller.js';
import { RemoveJobRoleController } from './remove-job-role/remove-job-role.controller.js';

@Module({
  imports: [DrizzleOrmModule],
  controllers: [
    GetAllController,
    AddJobRoleController,
    RemoveJobRoleController,
  ],
})
export class JobRoleModule {}
