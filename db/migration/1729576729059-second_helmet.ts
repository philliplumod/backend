import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondHelmet1729576729059 implements MigrationInterface {
    name = 'SecondHelmet1729576729059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "secondxxx_helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "second_helmet" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "UQ_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "UQ_10dd7d7fd1d07ed8c3186b4ff6c" UNIQUE ("motor_id")`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP COLUMN "second_helmet"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD "secondxxx_helmet" character varying NOT NULL`);
    }

}
