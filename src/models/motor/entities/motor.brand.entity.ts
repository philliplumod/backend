import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Motor } from './motor.entity';

@Entity({ name: 'tbl_motor_brand' })
export class MotorBrand {
  @PrimaryGeneratedColumn('uuid')
  brand_id: string;

  @Column()
  brand_name: string;

  @OneToMany(() => Motor, (motor) => motor.motorBrand)
  motors: Motor[];
}
