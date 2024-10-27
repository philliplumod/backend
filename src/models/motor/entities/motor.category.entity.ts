import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Motor } from './motor.entity';

@Entity('tbl_motor_category')
export class MotorCategory {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column()
  category_name: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  isArchived: boolean;

  @OneToMany(() => Motor, (motor) => motor.motorCategory)
  motors: Motor[];
}
