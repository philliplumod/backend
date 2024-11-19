import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1732029369984 implements MigrationInterface {
    name = 'YourChanges1732029369984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "is_approve" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "is_rent" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "is_decline" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "is_decline" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "is_rent" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "is_approve"`);
    }

}
