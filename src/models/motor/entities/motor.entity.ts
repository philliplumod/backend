import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MotorBrand } from './motor.brand.entity';

@Entity({ name: 'tbl_motor' })
export class Motor {
  @PrimaryGeneratedColumn('uuid')
  motor_id: string;

  @Column()
  model: string;

  @Column('decimal') // Use decimal for currency values
  price_per_day: number;

  @Column()
  description: string;

  @Column()
  motor_reg_no: string;

  @Column()
  isVisible: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @Column()
  brand_name: string;

  @OneToMany(() => MotorBrand, (motorBrand) => motorBrand.motor)
  brands: MotorBrand[]; // Relationship with MotorBrand
}
