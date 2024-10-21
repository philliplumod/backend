import { MigrationInterface, QueryRunner } from "typeorm";

export class NewCOlumn1729512134234 implements MigrationInterface {
    name = 'NewCOlumn1729512134234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "phone_folder"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "free_helmet" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "phone_holder" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "total_amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "days" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "booking_status"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "booking_status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "second_helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "second_helmet" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "extra_storage"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "extra_storage" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "extra_storage"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "extra_storage" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "second_helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "second_helmet" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "booking_status"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "booking_status" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "total_amount"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "phone_holder"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "free_helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "phone_folder" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "helmet" boolean NOT NULL`);
    }

}
