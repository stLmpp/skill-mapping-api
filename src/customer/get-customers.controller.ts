import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '@st-api/core';

import { Drizzle } from '../drizzle-orm.module.js';
import { CustomerEntity } from '../schema.js';

import { CustomerDto } from './dto/customer.dto.js';

@ApiTags('Customer')
@Controller({
  version: '1',
})
export class GetCustomersController {
  constructor(private readonly drizzle: Drizzle) {}

  @Response([CustomerDto])
  @Get()
  async getAll(): Promise<CustomerDto[]> {
    return this.drizzle
      .select({
        customerId: CustomerEntity.id,
        customerName: CustomerEntity.name,
      })
      .from(CustomerEntity);
  }
}
