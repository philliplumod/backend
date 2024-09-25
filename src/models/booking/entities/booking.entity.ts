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
  booking_date: Date;

  @Column()
  return_date: Date;

  @Column()
  booking_status: string;

  @Column()
  message: string;

  // Foreign key for User
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // This sets user_id as the foreign key column in tbl_booking
  user: User;

  // Foreign key for Motor
  @ManyToOne(() => Motor)
  @JoinColumn({ name: 'motor_id' }) // This sets motor_id as the foreign key column in tbl_booking
  motor: Motor;
}
