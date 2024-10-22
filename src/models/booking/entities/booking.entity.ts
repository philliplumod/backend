import { Motor } from 'src/models/motor/entities/motor.entity';
import { User } from 'src/models/user/entities/user.entity';
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

  @ManyToOne(() => Motor, (motor) => motor.motor_id)
  @JoinColumn({ name: 'motor_id' })
  motor: Motor;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  
}
