import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCreatedAtColumn1729768685177 implements MigrationInterface {
    name = 'AddedCreatedAtColumn1729768685177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "created_at"`);
    }

}
