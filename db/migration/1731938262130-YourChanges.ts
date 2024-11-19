import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1731938262130 implements MigrationInterface {
    name = 'YourChanges1731938262130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "start_booking" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "end_booking" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "is_rent" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "is_rent"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "end_booking"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "start_booking"`);
    }

}
