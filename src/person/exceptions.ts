import { exception } from '@assis-delivery/core';
import { HttpStatus } from '@nestjs/common';

export const SkillNotFound = exception({
  message: 'Skill not found',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-0001',
});

export const SkillLevelNotFound = exception({
  message: 'Skill level not found',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-0002',
});

export const SkillsMustBeUnique = exception({
  message: 'Skills must be unique',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-0003',
  error: 'body.skills must not have duplicated skillIds',
});
