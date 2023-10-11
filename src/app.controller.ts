import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service.js';
import { Drizzle } from './drizzle-orm.module.js';
import { PersonEntity } from './schema/person.entity.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly drizzle: Drizzle,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('person')
  getPerson() {
    return this.drizzle.select().from(PersonEntity);
  }
}
