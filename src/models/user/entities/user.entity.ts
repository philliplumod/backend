import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({ name: 'tbl_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  status: boolean;

  @Column()
  role: string;

  @Column()
  contact_no: string;

  @Column()
  address: string;

  @Column()
  birthdate: string;

  @Column()
  gender: string;

  @Column()
  license_no: string;

  @Column()
  license_front: string;

  @Column()
  license_back: string;

  @Column()
  other_id: string;

  @Column()
  other_id_no: string;
}
