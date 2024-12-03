import { Motor } from 'src/models/motor/entities/motor.entity';
import { User } from 'src/models/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'tbl_booking' })
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string;

  @Column()
  pickup_date: Date;

  @Column()
  return_date: Date;

  @Column({ default: 'pending' })
  booking_status: string;

  @Column()
  free_helmet: string;

  @Column()
  second_helmet: string;

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

  @CreateDateColumn()
  created_at: Date;

  @Column()
  reference_link: string;

  @Column()
  remark: string;

  @Column()
  paid_status: string;

  @Column()
  return_status: string;

  @Column()
  start_booking: string;

  @Column()
  end_booking: string;

  @Column({ default: '0000:00:00' })
  date_of_payment: Date;

  @Column({ default: false })
  is_rent: boolean;

  @Column({ default: false })
  is_decline: boolean;

  @Column({ default: false })
  is_approve: boolean;

  @Column({ default: 'Active' })
  rental_status: string;

  @ManyToOne(() => Motor, (motor) => motor.motor_id)
  @JoinColumn({ name: 'motor_id' })
  motor: Motor;

  @ManyToOne(() => User, (user_id) => user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
