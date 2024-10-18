import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteColumn1729257242154 implements MigrationInterface {
    name = 'DeleteColumn1729257242154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "test"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ADD "test" character varying NOT NULL`);
    }

}
