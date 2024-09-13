import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/models/user/entities/user.entity';

@Entity({ name: 'tbl_document' })
export class UserDocument  {
  @PrimaryGeneratedColumn('uuid')
  document_id: string;

  @Column({ unique: true })
  license_no: string;

  @Column()
  license_id: string;

  @Column()
  support_id_type: string;

  @Column({ unique: true })
  support_no: string;

  // Many documents can be linked to one user
  @ManyToOne(() => User, (user) => user.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // FK
  user: User;
}
