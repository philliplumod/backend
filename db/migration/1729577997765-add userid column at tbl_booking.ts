import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUseridColumnAtTblBooking1729577997765 implements MigrationInterface {
    name = 'AddUseridColumnAtTblBooking1729577997765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_a871645fecbf477c4d475d78d2e" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_a871645fecbf477c4d475d78d2e"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "user_id"`);
    }

}
