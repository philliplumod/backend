import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourChanges1730037732236 implements MigrationInterface {
  name = 'YourChanges1730037732236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tbl_block" ("block_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "block_status" boolean NOT NULL, "message" character varying NOT NULL, "user_id" uuid NOT NULL, "block_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_838a45be3fabb458ca88fc3ec7" UNIQUE ("user_id"), CONSTRAINT "PK_3d44fc8a18e9e68adc303574f4b" PRIMARY KEY ("block_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_user" ADD "isBlocked" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_motor_category" ADD "isArchived" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_block" ADD CONSTRAINT "FK_838a45be3fabb458ca88fc3ec7c" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tbl_block" DROP CONSTRAINT "FK_838a45be3fabb458ca88fc3ec7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tbl_motor_category" DROP COLUMN "isArchived"`,
    );
    await queryRunner.query(`ALTER TABLE "tbl_user" DROP COLUMN "isBlocked"`);
    await queryRunner.query(`DROP TABLE "tbl_block"`);
  }
}
