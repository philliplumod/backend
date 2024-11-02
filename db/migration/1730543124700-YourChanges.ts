import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1730543124700 implements MigrationInterface {
    name = 'YourChanges1730543124700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP CONSTRAINT "FK_f97fd867923d27d3b744e25679c"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor_category" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "isBlocked" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_block" ALTER COLUMN "block_status" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD CONSTRAINT "FK_f97fd867923d27d3b744e25679c" FOREIGN KEY ("category_id") REFERENCES "tbl_motor_category"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP CONSTRAINT "FK_f97fd867923d27d3b744e25679c"`);
        await queryRunner.query(`ALTER TABLE "tbl_block" ALTER COLUMN "block_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "isBlocked" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "tbl_motor_category" ADD "isArchived" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD CONSTRAINT "FK_f97fd867923d27d3b744e25679c" FOREIGN KEY ("category_id") REFERENCES "tbl_motor_category"("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
