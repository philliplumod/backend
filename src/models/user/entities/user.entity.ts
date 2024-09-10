import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsPhoneNumber } from "class-validator";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bigint' })
  @IsPhoneNumber()
  contactNo: number;

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