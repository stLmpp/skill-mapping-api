import { Controller, Get } from '@nestjs/common';
import { ZRes } from '@st-api/core';

import { GetAllPersonService } from './get-all-person.service.js';
import { PersonDataDto } from './person-data.dto.js';

@Controller({
  version: '1',
})
export class GetAllPersonController {
  constructor(private readonly getAllPersonService: GetAllPersonService) {}

  @ZRes([PersonDataDto])
  @Get()
  async getAll(): Promise<PersonDataDto[]> {
    return this.getAllPersonService.getAll();
  }
}
