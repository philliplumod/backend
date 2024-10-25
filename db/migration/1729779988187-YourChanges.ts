import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1729779988187 implements MigrationInterface {
    name = 'YourChanges1729779988187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "role" character varying NOT NULL, "contact_no" character varying NOT NULL, "address" character varying NOT NULL, "birthdate" character varying NOT NULL, "gender" character varying NOT NULL, "license_no" character varying NOT NULL, "license_front" character varying NOT NULL, "license_back" character varying NOT NULL, "other_id" character varying NOT NULL, "other_id_no" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cfbcdcc1a279167103bbda66bd6" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_motor_brand" ("brand_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a84ad4086556a22aaa7aba42a53" PRIMARY KEY ("brand_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_motor" ("motor_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" character varying NOT NULL, "plate_no" character varying NOT NULL, "price" integer NOT NULL, "model" character varying NOT NULL, "motor_picture" character varying NOT NULL, "description" character varying NOT NULL, "isVisible" boolean NOT NULL, "isDelete" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "brand_id" uuid, CONSTRAINT "PK_82bb67cecdf8a564b2c59c10c11" PRIMARY KEY ("motor_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_booking" ("booking_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pickup_date" character varying NOT NULL, "return_date" character varying NOT NULL, "booking_status" character varying NOT NULL, "free_helmet" character varying NOT NULL, "second_helmet" character varying NOT NULL, "phone_holder" character varying NOT NULL, "total_amount" integer NOT NULL, "days" integer NOT NULL, "extra_storage" character varying NOT NULL, "payment_method" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "motor_id" uuid, "user_id" uuid, CONSTRAINT "PK_2b3cdc02ffc2be2a2300e2b8c43" PRIMARY KEY ("booking_id"))`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD CONSTRAINT "FK_0b06b06ab39dda4ff89ed018972" FOREIGN KEY ("brand_id") REFERENCES "tbl_motor_brand"("brand_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_a871645fecbf477c4d475d78d2e" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_a871645fecbf477c4d475d78d2e"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP CONSTRAINT "FK_0b06b06ab39dda4ff89ed018972"`);
        await queryRunner.query(`DROP TABLE "tbl_booking"`);
        await queryRunner.query(`DROP TABLE "tbl_motor"`);
        await queryRunner.query(`DROP TABLE "tbl_motor_brand"`);
        await queryRunner.query(`DROP TABLE "tbl_user"`);
    }

}
