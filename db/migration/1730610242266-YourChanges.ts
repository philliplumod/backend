import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1730610242266 implements MigrationInterface {
    name = 'YourChanges1730610242266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_user" ALTER COLUMN "status" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
