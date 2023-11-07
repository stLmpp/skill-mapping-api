import { ForwardReference } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { sentenceCase } from 'change-case';

function isForwardRef(value: unknown): value is ForwardReference {
  return !!value && typeof value === 'object' && 'forwardRef' in value;
}

export function addTagsToAllControllers(moduleType: unknown): void {
  if (
    typeof moduleType !== 'function' ||
    !moduleType.name ||
    isForwardRef(moduleType)
  ) {
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
