import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsPhoneNumber } from "class-validator";
import { v4 as uuidv4 } from 'uuid';

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

  @Column({type: 'bigint'})
  @IsPhoneNumber()
  contactNo: number;

  @Column()
  birthday: string;

  @Column()
  status: boolean;

}


