import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsPhoneNumber } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity({name: 'tbl_user'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string = uuidv4();

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bigint' })
  @IsPhoneNumber()
  contact_no: number;

  @Column()
  birthday: string;

  @Column()
  status: boolean;

  @Column()
  password: string;

  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
