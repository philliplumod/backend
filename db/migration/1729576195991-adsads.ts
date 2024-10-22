import { MigrationInterface, QueryRunner } from "typeorm";

export class Adsads1729576195991 implements MigrationInterface {
    name = 'Adsads1729576195991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "second_helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "secondxxx_helmet" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "days" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "days" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "secondxxx_helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "second_helmet" character varying NOT NULL`);
    }

}
