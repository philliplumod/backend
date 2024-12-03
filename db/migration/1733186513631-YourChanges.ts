import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1733186513631 implements MigrationInterface {
    name = 'YourChanges1733186513631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "pickup_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "return_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "end_booking" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "date_of_payment" SET DEFAULT '0000:00:00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "date_of_payment" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "end_booking" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "return_date" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ALTER COLUMN "pickup_date" SET DEFAULT CURRENT_TIMESTAMP`);
    }

}
