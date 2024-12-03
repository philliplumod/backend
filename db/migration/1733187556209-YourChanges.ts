import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourChanges1733187556209 implements MigrationInterface {
  name = 'YourChanges1733187556209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "end_booking"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "end_booking" character varying NOT NULL DEFAULT ''`,
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
      `ALTER TABLE "tbl_booking" DROP COLUMN "end_booking"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "end_booking" TIMESTAMP NOT NULL`,
    );
  }
}
