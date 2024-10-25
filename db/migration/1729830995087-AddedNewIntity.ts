import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewIntity1729830995087 implements MigrationInterface {
    name = 'AddedNewIntity1729830995087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_motor_category" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b09bd87f4e732b19d16c7b2fc32" PRIMARY KEY ("category_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tbl_motor_category"`);
    }

}
