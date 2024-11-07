import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ length: 50 })
  name!: string;

  @Property({ length: 100 })
  email!: string;

  @Property({ length: 100 })
  password!: string;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Property({ defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
  updatedAt?: Date;
}
