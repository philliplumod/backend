import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserDocument } from 'src/models/document/entities/document.entity';

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

  // One user can have multiple documents
  @OneToMany(() => UserDocument, (document) => document.user)
  documents: UserDocument[];
}
