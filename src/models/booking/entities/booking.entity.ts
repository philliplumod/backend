import { Motor } from 'src/models/motor/entities/motor.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'tbl_booking' })
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string;

  @Column()
  pickup_date: string;

  @Column()
  return_date: string;

  @Column()
  booking_status: string;

  @Column()
  free_helmet: string;

  @Column()
  secondxxx_helmet: string;

  @Column()
  phone_holder: string;

  @Column()
  total_amount: number;

  @Column()
  days: number;

  @Column()
  extra_storage: string;

  @Column()
  payment_method: string;

  @OneToOne(() => Motor, (motor) => motor.motor_id)
  @JoinColumn({ name: 'motor_id' })
  motor: Motor;
}
