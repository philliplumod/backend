import { MigrationInterface, QueryRunner } from "typeorm";

export class DateOfPayment1732262234123 implements MigrationInterface {
    name = 'DateOfPayment1732262234123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "date_of_payment" character varying NOT NULL DEFAULT '0000:00:00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "date_of_payment"`);
    }

}
