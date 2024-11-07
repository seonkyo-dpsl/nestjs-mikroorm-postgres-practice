import { Migration } from '@mikro-orm/migrations';

export class Migration20241107054940_add_user extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user" (
        "id" serial primary key, 
        "name" varchar(50) not null, 
        "email" varchar(100) not null, 
        "password" varchar(100) not null, 
        "created_at" timestamptz not null default CURRENT_TIMESTAMP, 
        "updated_at" timestamptz not null default CURRENT_TIMESTAMP
      );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "user";');
  }
}
