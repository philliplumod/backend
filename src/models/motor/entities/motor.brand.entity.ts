import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Motor } from './motor.entity';

@Entity('tbl_motor_brand')
export class MotorBrand {
  @PrimaryGeneratedColumn('uuid')
  brand_id: string;

  @Column()
  brand_name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Motor, (motor) => motor.motorBrand)
  motors: Motor[];
}
