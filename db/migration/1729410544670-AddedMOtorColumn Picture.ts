import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMOtorColumnPicture1729410544670 implements MigrationInterface {
    name = 'AddedMOtorColumnPicture1729410544670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD "motor_picture" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ALTER COLUMN "isVisible" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ALTER COLUMN "isDelete" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_motor" ALTER COLUMN "isDelete" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ALTER COLUMN "isVisible" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP COLUMN "motor_picture"`);
    }

}
