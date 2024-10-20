import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTblBookingWithNewColumn1729424642220 implements MigrationInterface {
    name = 'UpdateTblBookingWithNewColumn1729424642220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_a871645fecbf477c4d475d78d2e"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "booking_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "motor_id"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "pickup_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "helmet" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "second_helmet" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "phone_folder" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "extra_storage" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "payment_method" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "payment_method"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "extra_storage"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "phone_folder"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "second_helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "pickup_date"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "motor_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "booking_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_a871645fecbf477c4d475d78d2e" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
