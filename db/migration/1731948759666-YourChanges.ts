import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1731948759666 implements MigrationInterface {
    name = 'YourChanges1731948759666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP CONSTRAINT "FK_0b06b06ab39dda4ff89ed018972"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP COLUMN "brand_id"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "start_booking" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "end_booking" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "is_rent" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "is_rent"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "end_booking"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "start_booking"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD "brand_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD CONSTRAINT "FK_0b06b06ab39dda4ff89ed018972" FOREIGN KEY ("brand_id") REFERENCES "tbl_motor_brand"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
