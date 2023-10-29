import { Type } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { sentenceCase } from 'change-case';

export function addTagsToAllControllers(moduleType: Type): void {
  if (typeof moduleType !== 'function' || !moduleType.name) {
    return;
  }
  const imports = Reflect.getMetadata('imports', moduleType) ?? [];
  for (const type of imports) {
    addTagsToAllControllers(type);
  }
  const controllers = Reflect.getMetadata('controllers', moduleType) ?? [];
  const tag = sentenceCase(moduleType.name.replace(/Module$/, ''));
  for (const controller of controllers) {
    ApiTags(tag)(controller);
  }
}
