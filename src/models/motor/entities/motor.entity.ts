import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { MotorCategory } from './motor.category.entity';

@Entity({ name: 'tbl_motor' })
export class Motor {
  @PrimaryGeneratedColumn('uuid')
  motor_id: string;

  @Column()
  color: string;

  @Column()
  plate_no: string;

  @Column()
  price: number;

  @Column()
  model: string;

  @Column()
  motor_picture: string;

  @Column()
  description: string;

  @Column()
  isVisible: boolean;

  @Column()
  isDelete: boolean;

  @Column()
  cubic_capacity: string;

  @Column()
  helmet_price: number;

  @Column()
  storage_price: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => MotorCategory, (motorCategory) => motorCategory.motors)
  @JoinColumn({ name: 'category_id' })
  motorCategory: MotorCategory;
}
