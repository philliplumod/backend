import { MigrationInterface, QueryRunner } from "typeorm";

export class YourChanges1731938262130 implements MigrationInterface {
    name = 'YourChanges1731938262130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tbl_user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "role" character varying NOT NULL, "contact_no" character varying NOT NULL, "address" character varying NOT NULL, "birthdate" character varying NOT NULL, "gender" character varying NOT NULL, "profile_pic" character varying NOT NULL, "license_no" character varying NOT NULL, "license_front" character varying NOT NULL, "license_back" character varying NOT NULL, "other_id" character varying NOT NULL, "other_id_no" character varying NOT NULL, "isBlocked" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cfbcdcc1a279167103bbda66bd6" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_block" ("block_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "block_status" boolean NOT NULL DEFAULT false, "message" character varying NOT NULL, "user_id" uuid NOT NULL, "block_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_838a45be3fabb458ca88fc3ec7" UNIQUE ("user_id"), CONSTRAINT "PK_3d44fc8a18e9e68adc303574f4b" PRIMARY KEY ("block_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_motor_category" ("category_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b09bd87f4e732b19d16c7b2fc32" PRIMARY KEY ("category_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_motor" ("motor_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "color" character varying NOT NULL, "plate_no" character varying NOT NULL, "price" integer NOT NULL, "model" character varying NOT NULL, "motor_picture" character varying NOT NULL, "description" character varying NOT NULL, "isVisible" boolean NOT NULL, "isDelete" boolean NOT NULL, "cubic_capacity" character varying NOT NULL, "helmet_price" integer NOT NULL, "storage_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" uuid, CONSTRAINT "PK_82bb67cecdf8a564b2c59c10c11" PRIMARY KEY ("motor_id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_booking" ("booking_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pickup_date" character varying NOT NULL, "return_date" character varying NOT NULL, "booking_status" character varying NOT NULL, "free_helmet" character varying NOT NULL, "second_helmet" character varying NOT NULL, "phone_holder" character varying NOT NULL, "total_amount" integer NOT NULL, "days" integer NOT NULL, "extra_storage" character varying NOT NULL, "payment_method" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "reference_link" character varying NOT NULL, "remark" character varying NOT NULL, "paid_status" character varying NOT NULL, "return_status" character varying NOT NULL, "start_booking" character varying NOT NULL, "end_booking" character varying NOT NULL, "is_rent" boolean NOT NULL, "motor_id" uuid, "user_id" uuid, CONSTRAINT "PK_2b3cdc02ffc2be2a2300e2b8c43" PRIMARY KEY ("booking_id"))`);
        await queryRunner.query(`ALTER TABLE "tbl_block" ADD CONSTRAINT "FK_838a45be3fabb458ca88fc3ec7c" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" ADD CONSTRAINT "FK_f97fd867923d27d3b744e25679c" FOREIGN KEY ("category_id") REFERENCES "tbl_motor_category"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c" FOREIGN KEY ("motor_id") REFERENCES "tbl_motor"("motor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" ADD CONSTRAINT "FK_a871645fecbf477c4d475d78d2e" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_a871645fecbf477c4d475d78d2e"`);
        await queryRunner.query(`ALTER TABLE "tbl_booking" DROP CONSTRAINT "FK_10dd7d7fd1d07ed8c3186b4ff6c"`);
        await queryRunner.query(`ALTER TABLE "tbl_motor" DROP CONSTRAINT "FK_f97fd867923d27d3b744e25679c"`);
        await queryRunner.query(`ALTER TABLE "tbl_block" DROP CONSTRAINT "FK_838a45be3fabb458ca88fc3ec7c"`);
        await queryRunner.query(`DROP TABLE "tbl_booking"`);
        await queryRunner.query(`DROP TABLE "tbl_motor"`);
        await queryRunner.query(`DROP TABLE "tbl_motor_category"`);
        await queryRunner.query(`DROP TABLE "tbl_block"`);
        await queryRunner.query(`DROP TABLE "tbl_user"`);
    }

}
