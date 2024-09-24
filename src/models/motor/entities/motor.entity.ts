import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MotorBrand } from './motor.brand.entity';

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
  description: string;

  @Column({ default: false })
  isVisible: boolean;

  @Column({ default: false })
  isDelete: boolean;

  // Foreign key relationship with MotorBrand
  @ManyToOne(() => MotorBrand, (motorBrand) => motorBrand.motors)
  @JoinColumn({ name: 'brand_id' }) // foreign key in the tbl_motor table
  motorBrand: MotorBrand;
}
