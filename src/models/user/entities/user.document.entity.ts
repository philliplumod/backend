import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tbl_document' })
export class UserDocument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  license_no: string;

  @Column()
  license_id: string;

  @Column()
  support_id_type: string;

  @Column()
  support_no: string;

  @OneToOne(() => User, user => user.document)
  user: User;
}