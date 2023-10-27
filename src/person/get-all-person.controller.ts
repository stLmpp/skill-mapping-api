import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ZRes } from '@st-api/core';

import { PersonDataDto } from './dto/person-data.dto.js';
import { GetAllPersonService } from './get-all-person.service.js';

@ApiTags('Person')
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
