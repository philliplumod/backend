import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourChanges1733146506413 implements MigrationInterface {
  name = 'YourChanges1733146506413';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "pickup_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "pickup_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "return_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "return_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "end_booking"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "end_booking" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "date_of_payment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "date_of_payment" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "date_of_payment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "date_of_payment" character varying NOT NULL DEFAULT '0000:00:00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "end_booking"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "end_booking" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "return_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "return_date" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" DROP COLUMN "pickup_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_booking" ADD "pickup_date" character varying NOT NULL`,
    );
  }
}
