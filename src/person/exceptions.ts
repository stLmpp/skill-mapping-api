import { HttpStatus } from '@nestjs/common';
import { exception } from '@st-api/core';

export const SkillNotFoundBadRequest = exception({
  message: 'Skill not found',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-0001',
});

export const SkillLevelNotFoundBadRequest = exception({
  message: 'Skill level not found',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-0002',
});

export const ChapterNotFound = exception({
  message: 'Chapter not found',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-0003',
});

export const CustomerNotFound = exception({
  message: 'Customer not found',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-0004',
});

export const CareerLevelNotFound = exception({
  message: 'Career level not found',
  status: HttpStatus.BAD_REQUEST,
  errorCode: 'PERSON-0005',
});

export const PersonNotFound = exception({
  message: 'Person not found',
  status: HttpStatus.NOT_FOUND,
  errorCode: 'PERSON-0006',
});

export const SkillNotFound = exception({
  message: 'Skill not found',
  status: HttpStatus.NOT_FOUND,
  errorCode: 'PERSON-0007',
});
