import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tbl_motor' })
export class Motor {
  @PrimaryGeneratedColumn('uuid')
  motor_id: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column()
  price_per_day: number;

  @Column()
  description: string;

  @Column()
  motor_reg_no: string;

  @Column()
  isVisible: boolean;

  @Column({ default: false })
  isArchived: boolean;
}
