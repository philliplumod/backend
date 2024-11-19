import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1732033001138 implements MigrationInterface {
    name = 'YourChanges1732033001138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "isVerified"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

}
