import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Motor } from './motor.entity';

@Entity({ name: 'tbl_brand' }) // Ensure it reflects the brand table name
export class MotorBrand {
  @PrimaryGeneratedColumn('uuid')
  brand_id: string;

  @Column({ unique: true })
  license_no: string;

  @Column()
  brand_name: string;

  @ManyToOne(() => Motor, (motor) => motor.brands, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'motor_id' })
  motor: Motor;
}
