import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtAllTables1729768948517 implements MigrationInterface {
    name = 'AddCreatedAtAllTables1729768948517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_motor_brand" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor_brand" DROP COLUMN "created_at"`);
    }

}
