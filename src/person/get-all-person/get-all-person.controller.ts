import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ZRes } from '@st-api/core';

import { GetAllPersonService } from './get-all-person.service.js';
import { PersonDataDto } from './person-data.dto.js';

@Controller({
  version: '1',
})
export class GetAllPersonController {
  constructor(private readonly getAllPersonService: GetAllPersonService) {}

  @ApiOperation({
    summary: 'Get all person with all relations',
  })
  @ZRes([PersonDataDto])
  @Get()
  async getAll(): Promise<PersonDataDto[]> {
    return this.getAllPersonService.getAll();
  }
}
