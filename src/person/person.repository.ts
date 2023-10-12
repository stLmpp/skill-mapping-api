import { Injectable } from '@nestjs/common';
import { eq, InferInsertModel } from 'drizzle-orm';

import { Drizzle } from '../drizzle-orm.module.js';
import { PersonEntity } from '../schema.js';

@Injectable()
export class PersonRepository {
  constructor(private readonly drizzle: Drizzle) {}

  async findByPid(pid: string) {
    const [person] = await this.drizzle
      .select()
      .from(PersonEntity)
      .where(eq(PersonEntity.pid, pid));
    return person;
  }

  async create(dto: InferInsertModel<typeof PersonEntity>) {
    const [entity] = await this.drizzle
      .insert(PersonEntity)
      .values(dto)
      .returning();
    return entity!;
  }

  async update(dto: { otherInformation?: string }): Promise<void> {
    await this.drizzle.update(PersonEntity).set({
      otherInformation: dto.otherInformation ?? null,
    });
  }
}
