import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { MotorBrand } from './motor.brand.entity';
import { ApiProperty } from '@nestjs/swagger';

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

  @CreateDateColumn()
  created_at: Date;

  // Foreign key relationship with MotorBrand
  @ManyToOne(() => MotorBrand, (motorBrand) => motorBrand.motors)
  @JoinColumn({ name: 'brand_id' }) // foreign key in the tbl_motor table
  motorBrand: MotorBrand;
}
