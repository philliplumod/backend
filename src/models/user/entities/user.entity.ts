import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
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

  @Column()
  contact_no: string; // Changed from number to string

  @Column()
  birthday: string;

  @Column()
  status: boolean;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  gender: string; // Ensure this field is not null

  @Column({ default: false })
  isArchived: boolean;

  @OneToOne(() => UserDocument, document => document.user, { cascade: true })
  @JoinColumn()
  document: UserDocument;
}