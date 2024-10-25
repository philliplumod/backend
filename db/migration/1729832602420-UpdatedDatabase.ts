import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedDatabase1729832602420 implements MigrationInterface {
    name = 'UpdatedDatabase1729832602420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD "cubic_capacity" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD "helmet_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD "storage_price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ADD "profile_pic" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "reference_link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "remark" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "paid_status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "return_status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD CONSTRAINT "FK_f97fd867923d27d3b744e25679c" FOREIGN KEY ("category_id") REFERENCES "tbl_motor_category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP CONSTRAINT "FK_f97fd867923d27d3b744e25679c"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "return_status"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "paid_status"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "remark"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "reference_link"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "profile_pic"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP COLUMN "storage_price"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP COLUMN "helmet_price"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP COLUMN "cubic_capacity"`);
    }

}
