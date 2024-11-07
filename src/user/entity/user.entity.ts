import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';

@SoftDeletable(() => User, 'deletedAt', () => new Date())
@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ length: 50 })
  name!: string;

  @Property({ length: 100 })
  email!: string;

  @Property({ length: 100, hidden: true })
  password!: string;

  @Property({ nullable: false, defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Property({ nullable: false, defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
  updatedAt?: Date;

  @Property({ nullable: true })
  deletedAt?: Date;
}
