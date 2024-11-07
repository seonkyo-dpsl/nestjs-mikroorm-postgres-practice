import { Migration } from '@mikro-orm/migrations';

export class Migration20241107084520_add_unique_to_user_email extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "user" add constraint "unique_email" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "unique_email";`);
  }
}
