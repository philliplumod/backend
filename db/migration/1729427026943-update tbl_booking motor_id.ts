import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTblBookingMotorId1729427026943 implements MigrationInterface {
    name = 'UpdateTblBookingMotorId1729427026943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "motor_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "UQ_10dd7d7fd1d07ed8c3186b4ff6c" UNIQUE ("motor_id")`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "pickup_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "pickup_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "return_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "return_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "booking_status"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "booking_status" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "booking_status"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "booking_status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "return_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "return_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "pickup_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "pickup_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "UQ_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "motor_id"`);
    }

}
