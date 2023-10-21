import { Module } from '@nestjs/common';

import { DrizzleOrmModule } from '../drizzle-orm.module.js';

import { GetCustomersController } from './get-customers.controller.js';

@Module({
  imports: [DrizzleOrmModule],
  controllers: [GetCustomersController],
})
export class CustomerModule {}
