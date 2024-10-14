import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { UserDocument } from './user.document.entity';

@Entity({ name: 'tbl_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'bigint' })
  contact_no: number;

  @Column()
  birthday: string;

  @Column()
  status: boolean;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  

  @OneToOne(() => UserDocument, (document) => document.user)
  document: UserDocument[];

  @Column({ default: false })
  isArchived: boolean;
}
