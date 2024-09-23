import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbl_motor_brand' })
export class MotorBrand {
  @PrimaryGeneratedColumn('uuid')
  brand_id: string;

  @Column()
  brand_name: string;
}
