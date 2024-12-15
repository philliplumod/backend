import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourChanges1734276933824 implements MigrationInterface {
  name = 'YourChanges1734276933824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "penalty_type" character varying`,
    );
    await queryRunner.query(
      `UPDATE "tbl_booking" SET "penalty_type" = 'default_value' WHERE "penalty_type" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ALTER COLUMN "penalty_type" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ALTER COLUMN "date_of_payment" SET DEFAULT '0000:00:00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ALTER COLUMN "date_of_payment" SET DEFAULT '1970-01-01 00:00:00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "penalty_type"`,
    );
  }
}
