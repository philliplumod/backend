import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourChanges1733566851846 implements MigrationInterface {
  name = 'YourChanges1733566851846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "penalty" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ALTER COLUMN "end_booking" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ALTER COLUMN "date_of_payment" SET DEFAULT '1970-01-01 00:00:00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ALTER COLUMN "date_of_payment" SET DEFAULT '1970-01-01 00:00:00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ALTER COLUMN "end_booking" SET DEFAULT ''`,
    );
    await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "penalty"`);
  }
}
