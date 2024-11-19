import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1732024360510 implements MigrationInterface {
    name = 'YourChanges1732024360510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "is_decline" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "is_decline"`);
    }

}
