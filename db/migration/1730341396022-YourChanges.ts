import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1730341396022 implements MigrationInterface {
    name = 'YourChanges1730341396022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "isBlocked" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_motor_category" ALTER COLUMN "isArchived" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_motor_category" ALTER COLUMN "isArchived" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "isBlocked" SET DEFAULT false`);
    }

}
