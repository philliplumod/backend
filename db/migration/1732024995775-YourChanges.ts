import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1732024995775 implements MigrationInterface {
    name = 'YourChanges1732024995775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "is_decline" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "is_decline" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "isVerified"`);
    }

}
