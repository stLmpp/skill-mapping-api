import { Controller, Get, HttpStatus, Logger, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { exception, safeAsync } from '@st-api/core';
import { format, isBefore, subMonths } from 'date-fns';
import ExcelJS from 'exceljs';
import type { Response } from 'express';

import { GetAllPersonService } from './get-all-person.service.js';
import { PersonDataDto } from './person-data.dto.js';

const XlsxInternalServerError = exception({
  errorCode: 'PERSON-XLSX-0001',
  error: 'Error while trying to generate the XLSX, please check the logs.',
  status: HttpStatus.INTERNAL_SERVER_ERROR,
});

@Controller({
  version: '1',
  path: 'file/xlsx',
})
export class GetAllPersonXlsxController {
  constructor(private readonly getAllPersonService: GetAllPersonService) {}

  private readonly logger = new Logger(GetAllPersonXlsxController.name);

  @ApiResponse({
    status: HttpStatus.OK,
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    description: 'Returns a XLSX file',
  })
  @Get()
  async getFile(@Res() response: Response) {
    const entities = await this.getAllPersonService.getAll();
    const workbook = new ExcelJS.Workbook();
    this.setSummarySheet(workbook, entities);
    this.setSkillsSheet(workbook, entities);
    this.setInterestSheet(workbook, entities);
    this.setLanguageSheet(workbook, entities);
    response.contentType(
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-disposition',
      `attachment; filename=extracted-${new Date().toISOString()}.xlsx`,
    );
    const [error, xlsx] = await safeAsync(() => workbook.xlsx.writeBuffer());
    if (error) {
      this.logger.error(`Error while trying to generate the XLSX`, error);
      throw XlsxInternalServerError();
    }
    response.send(xlsx);
  }

  private setSummarySheet(
    workbook: ExcelJS.Workbook,
    entities: PersonDataDto[],
  ) {
    const summarySheet = workbook.addWorksheet('Resumo');
    summarySheet.columns = [
      { key: 'eid', header: 'EID' },
      { key: 'chapter', header: 'Chapter' },
      { key: 'careerLevel', header: 'CL' },
      { key: 'lastCustomer', header: 'Ultimo cliente' },
      { key: 'lastJobRole', header: 'Ultima função' },
      { key: 'skills', header: 'Skills' },
      { key: 'otherInformation', header: 'Outras informações' },
      { key: 'peopleLead', header: 'People Lead' },
      { key: 'updatedAt', header: 'Última atualização' },
    ];
    for (const entity of entities) {
      const row = summarySheet.addRow({
        eid: entity.eid,
        skills: entity.skills
          .map((skill) => `${skill.skillName}: ${skill.skillLevelName}`)
          .join('\n'),
        otherInformation: entity.otherInformation,
        careerLevel: entity.careerLevelName,
        chapter: entity.chapterName,
        lastCustomer: entity.lastCustomerName,
        updatedAt: format(entity.updatedAt, 'dd/MM/yyyy HH:mm:ss'),
        peopleLead: entity.peopleLeadEid,
        lastJobRole: entity.lastJobRoleName,
      });
      const updatedAtCell = row.getCell('updatedAt');
      if (!updatedAtCell) {
        continue;
      }
      const _3MonthsAgo = subMonths(new Date(), 3);
      const _5MonthsAgo = subMonths(new Date(), 5);
      let argb = '#FF3BD200';
      if (isBefore(entity.updatedAt, _3MonthsAgo)) {
        argb = '#FFFF9900';
      }
      if (isBefore(entity.updatedAt, _5MonthsAgo)) {
        argb = '#FFFF0000';
      }
      updatedAtCell.font = { color: { argb } };
    }
  }

  private setSkillsSheet(
    workbook: ExcelJS.Workbook,
    entities: PersonDataDto[],
  ) {
    const detailedSheet = workbook.addWorksheet('Skills');
    detailedSheet.columns = [
      { key: 'eid', header: 'EID' },
      { key: 'chapter', header: 'Chapter' },
      { key: 'careerLevel', header: 'CL' },
      { key: 'lastCustomer', header: 'Ultimo cliente' },
      { key: 'lastJobRole', header: 'Ultima função' },
      { key: 'skill', header: 'Skill' },
      { key: 'skillLevel', header: 'Proficiência' },
      { key: 'otherInformation', header: 'Outras informações' },
    ];
    for (const entity of entities) {
      for (const skill of entity.skills) {
        detailedSheet.addRow({
          eid: entity.eid,
          skill: skill.skillName,
          skillLevel: skill.skillLevelName,
          otherInformation: entity.otherInformation,
          careerLevel: entity.careerLevelName,
          chapter: entity.chapterName,
          lastCustomer: entity.lastCustomerName,
          lastJobRole: entity.lastJobRoleName,
        });
      }
    }
  }

  private setInterestSheet(
    workbook: ExcelJS.Workbook,
    entities: PersonDataDto[],
  ) {
    const detailedSheet = workbook.addWorksheet('Interesses');
    detailedSheet.columns = [
      { key: 'eid', header: 'EID' },
      { key: 'chapter', header: 'Chapter' },
      { key: 'careerLevel', header: 'CL' },
      { key: 'lastCustomer', header: 'Ultimo cliente' },
      { key: 'lastJobRole', header: 'Ultima função' },
      { key: 'skill', header: 'Skill' },
      { key: 'otherInformation', header: 'Outras informações' },
    ];
    for (const entity of entities) {
      for (const skill of entity.interest) {
        detailedSheet.addRow({
          eid: entity.eid,
          skill: skill.skillName,
          otherInformation: entity.otherInformation,
          careerLevel: entity.careerLevelName,
          chapter: entity.chapterName,
          lastCustomer: entity.lastCustomerName,
          lastJobRole: entity.lastJobRoleName,
        });
      }
    }
  }

  private setLanguageSheet(
    workbook: ExcelJS.Workbook,
    entities: PersonDataDto[],
  ) {
    const detailedSheet = workbook.addWorksheet('Idiomas');
    detailedSheet.columns = [
      { key: 'eid', header: 'EID' },
      { key: 'chapter', header: 'Chapter' },
      { key: 'careerLevel', header: 'CL' },
      { key: 'lastCustomer', header: 'Ultimo cliente' },
      { key: 'lastJobRole', header: 'Ultima função' },
      { key: 'language', header: 'Idioma' },
      { key: 'skillLevel', header: 'Proficiência' },
      { key: 'otherInformation', header: 'Outras informações' },
    ];
    for (const entity of entities) {
      for (const language of entity.languages) {
        detailedSheet.addRow({
          eid: entity.eid,
          language: language.languageName,
          skillLevel: language.skillLevelName,
          otherInformation: entity.otherInformation,
          careerLevel: entity.careerLevelName,
          chapter: entity.chapterName,
          lastCustomer: entity.lastCustomerName,
          lastJobRole: entity.lastJobRoleName,
        });
      }
    }
  }
}
