import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1732528542576 implements MigrationInterface {
    name = 'YourChanges1732528542576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "rental_status" character varying NOT NULL DEFAULT 'Active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "rental_status"`);
    }

}
