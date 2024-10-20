import { Motor } from 'src/models/motor/entities/motor.entity';
import { User } from 'src/models/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'tbl_booking' })
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string;

  @Column()
  pickup_date: Date;

  @Column()
  return_date: Date;

  @Column()
  booking_status: string;

  @Column()
  helmet: boolean;

  @Column()
  second_helmet: boolean;

  @Column()
  phone_folder: boolean;

  @Column()
  extra_storage: boolean;

  @Column()
  payment_method: string;


}
